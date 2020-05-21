import React from "react";
import Immutable from 'immutable';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import path from 'path';
import { renderHtmlApp } from './appHtml';
import configureStoreSSR from '../../redux/configureStoreSSR';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import App from '../../src/serverIndex';

// const nodeStats = path.resolve('build/server/loadable-stats.json');
const reactStats = path.resolve('build/client/loadable-stats.json');

export const renderPage = async (ssrState: any, locationUrl: string) => {
  const storeState = Immutable.fromJS(ssrState);
  const ssrStore = configureStoreSSR(storeState);
  const context = {};
  // const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats, entrypoints: ['NodeApp'] });
  // const { default: NodeApp } = nodeExtractor.requireEntrypoint();
  // const webExtractor = new ChunkExtractor({ statsFile: reactStats, entrypoints: ['ReactApp'] });
  // const { default: ReactApp } = webExtractor.requireEntrypoint();
  // const jsxApp = webExtractor.collectChunks(<NodeApp />);
  // const htmlDom = renderToString(jsxApp);
  // const rtn = renderLazyApp(htmlDom, webExtractor);
  const webExtractor = new ChunkExtractor({ statsFile: reactStats, entrypoints: ['ReactApp'] });

  const AppWrapper = () => (
    <ChunkExtractorManager extractor={webExtractor}>
      <Provider store={ssrStore}>
        <StaticRouter location={locationUrl} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </ChunkExtractorManager>
  );
  const jsxApp: any = <AppWrapper />;
  const htmlDom = renderToString(jsxApp);
  const rtn = renderHtmlApp(htmlDom, ssrStore, webExtractor);

  return rtn;
};
