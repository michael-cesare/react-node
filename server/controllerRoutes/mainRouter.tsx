import express from 'express';

import asyncMiddleware from '../middleware/asyncMiddleware';
import { renderPage } from '../nodeViews/renderPage';
import { isEmpty } from '../../util/core';

const mainRouter = express.Router();
const apiTimeout = 5 * 100000;

const mainRoute = async (req: any, res: any, next: any) => {
  req.setTimeout(apiTimeout, () => {
    const err: any = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });

  const locationUrl = !isEmpty(req) && !isEmpty(req.url) ? req.url : '/';
  const ssrState = {};

  const pageHtml = await renderPage(ssrState, locationUrl);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(pageHtml);
  res.end();
};

mainRouter.get('/home', asyncMiddleware(mainRoute));
mainRouter.get('/*', asyncMiddleware(mainRoute));

export default mainRouter;
