import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import logger from '../util/logger';

const bootstrapApp = (renderMethod) => {
  logger.hit('[index] - bootstrapApp');
  const wrapper = document.getElementById('container');

  if (wrapper) {
    renderMethod(<App />, wrapper);
  }
};

bootstrapApp(ReactDOM.render);
