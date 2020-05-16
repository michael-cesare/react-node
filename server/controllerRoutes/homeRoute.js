import express from 'express';
import { renderToString } from 'react-dom/server';

import asyncMiddleware from '../middleware/asyncMiddleware.js';
import App from '../../src/App';
import logger from '../../util/logger';

const homeRouter = express.Router();
const apiTimeout = 5 * 100000;

const renderApp = (htmlDom) => {
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

  const reactJsx = <App />;
  const reactDom = renderToString(reactJsx);
  const rtn = renderApp(reactDom);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(rtn);
  res.end();
};

homeRouter.get('/', asyncMiddleware(homeRoute));
homeRouter.get('/home', asyncMiddleware(homeRoute));

export default homeRouter;
