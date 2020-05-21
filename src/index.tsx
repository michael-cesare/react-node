import "core-js/stable";
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { loadableReady } from '@loadable/component';

import { validateToken } from '../redux/actions/userActions';
import configureStore from '../redux/configureStore';
import ApiClient from '../util/ApiClient';
import { tokenGetter } from '../util/AuthToken';

import App from './App';
import logger from '../util/logger';

const client = new ApiClient(API_BASE_URL);

const customHistory = createBrowserHistory({
  basename: BASE_URL || '/',
});

const store = configureStore(client, customHistory);

// first thing to do onload App, check if token is valid or not.
const token = tokenGetter();
store.dispatch(validateToken(token));

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

// bootstrapApp(ReactDOM.hydrate);
loadableReady(() => bootstrapApp(ReactDOM.hydrate));