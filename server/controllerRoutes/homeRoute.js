import express from 'express';
import { renderToString } from 'react-dom/server';
import path from 'path';
// import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import asyncMiddleware from '../middleware/asyncMiddleware.js';
import App from '../../src/App';
import logger from '../../util/logger';

const homeRouter = express.Router();
const apiTimeout = 5 * 100000;

// const nodeStats = path.resolve('build/server/loadable-stats.json');
// const reactStats = path.resolve('build/client/loadable-stats.json');

const renderLazyApp = (htmlDom, webExtractor) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Set up React, Webpack, and Babel</title>
        ${webExtractor.getLinkTags()}
        ${webExtractor.getStyleTags()}
    </head>
    <body>
      <div id="container">${htmlDom}</div>
      ${webExtractor.getScriptTags()}
    </body>
    </html>`;
}

const renderHtmlApp = (htmlDom) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Set up React, Webpack, and Babel</title>
    </head>
    <body>
      <div id="container">${htmlDom}</div>
    </body>
    </html>`;
}

const homeRoute = async (req, res, next) => {
  req.setTimeout(apiTimeout, () => {
    const err = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });

  // const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: ['NodeApp'] });
  // const { default: NodeApp } = nodeExtractor.requireEntrypoint();
  // const webExtractor = new ChunkExtractor({ statsFile: reactStats, entrypoints: ['ReactApp'] });
  // const { default: ReactApp } = webExtractor.requireEntrypoint();
  // const jsxApp = webExtractor.collectChunks(<NodeApp />);
  // const htmlDom = renderToString(jsxApp);
  // const rtn = renderLazyApp(htmlDom, webExtractor);

  const jsxApp = <App />;
  const htmlDom = renderToString(jsxApp);
  const rtn = renderHtmlApp(htmlDom);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(rtn);
  res.end();
};

homeRouter.get('/', asyncMiddleware(homeRoute));
homeRouter.get('/home', asyncMiddleware(homeRoute));

export default homeRouter;
