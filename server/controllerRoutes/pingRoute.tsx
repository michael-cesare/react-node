import express from 'express';

import asyncMiddleware from '../middleware/asyncMiddleware';
import logger from '../../util/logger';

const pingRouter = express.Router();
const apiTimeout = 5 * 100000;

const pingRoute = async (req: any, res: any, next: any) => {
  logger.log('[ping] you hit the ping route');
  req.setTimeout(apiTimeout, () => {
    const err: any = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });

  const rtn = 'hello Node developer! Message from Ping';

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(rtn);
  res.end();
};

pingRouter.get('/ping', asyncMiddleware(pingRoute));

export default pingRouter;
