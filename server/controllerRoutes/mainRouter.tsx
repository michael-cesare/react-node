import express from 'express';
import React from "react";
import Immutable from 'immutable';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import path from 'path';
import { renderHtmlApp } from '../nodeViews/appHtml';
import configureStoreSSR from '../../redux/configureStoreSSR';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import asyncMiddleware from '../middleware/asyncMiddleware';
import NodeApp from '../../src/serverIndex';
import { isEmpty } from '../../util/core';

const mainRouter = express.Router();
const apiTimeout = 5 * 100000;

// const nodeStats = path.resolve('build/server/loadable-stats.json');
const reactStats = path.resolve('build/client/loadable-stats.json');

const mainRoute = async (req: any, res: any, next: any) => {
  req.setTimeout(apiTimeout, () => {
    const err: any = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });

  const locationUrl = !isEmpty(req) && !isEmpty(req.url) ? req.url : '/';
  const ssrState = {}; // prefetch some data from sources and build key values objects
  const storeState = Immutable.fromJS(ssrState);
  const ssrStore = configureStoreSSR(storeState);
  const context = {};

  // const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: ['NodeApp'] });
  // const { default: NodeApp } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: reactStats, entrypoints: ['ReactApp'] });

  const AppWrapper = (
    <Provider store={ssrStore}>
      <StaticRouter location={locationUrl} context={context}>
        <NodeApp />
      </StaticRouter>
    </Provider>
  );
  const jsxApp: any = webExtractor.collectChunks(AppWrapper);
  const htmlDom = renderToString(jsxApp);
  const rtn = renderHtmlApp(htmlDom, ssrStore, webExtractor);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(rtn);
  res.end();
};

mainRouter.get('/home', asyncMiddleware(mainRoute));
mainRouter.get('/*', asyncMiddleware(mainRoute));

export default mainRouter;
