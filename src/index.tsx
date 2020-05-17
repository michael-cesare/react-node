import React from 'react';
import ReactDOM from 'react-dom';
// import { loadableReady } from '@loadable/component';

import App from './App';
import logger from '../util/logger';

const bootstrapApp = (renderMethod: any) => {
  logger.hit('[index] - bootstrapApp');
  const wrapper = document.getElementById('container');

  if (wrapper) {
    renderMethod(<App />, wrapper);
  }
};

bootstrapApp(ReactDOM.hydrate);
// loadableReady(() => bootstrapApp(ReactDOM.hydrate));