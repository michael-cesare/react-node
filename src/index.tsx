import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import { loadableReady } from '@loadable/component';
import configureStore from '../redux/configureStore';
import ApiClient from '../util/ApiClient';

import App from './App';
import logger from '../util/logger';
// import { API_BASE_URL, BASE_URL } from '../typings';

const client = new ApiClient(API_BASE_URL);

const customHistory = createBrowserHistory({
  basename: BASE_URL || '',
});

const store = configureStore(client, customHistory);

const Application = () => (
  <Provider store={store}>
    <Router history={customHistory}>
      <App />
    </Router>
  </Provider>
);

const bootstrapApp = (renderMethod: any) => {
  logger.hit('[index] - bootstrapApp');
  const wrapper = document.getElementById('container');

  if (wrapper) {
    renderMethod(<Application />, wrapper);
  }
};

bootstrapApp(ReactDOM.hydrate);
// loadableReady(() => bootstrapApp(ReactDOM.hydrate));