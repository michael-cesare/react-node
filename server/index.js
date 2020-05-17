import express from 'express';
import http from 'http';
import open from 'open';

import envReader from '../envReader';
import errorHandler from './middleware/errorHandler.js';
import ping from './controllerRoutes/pingRoute';
import homeRoute from './controllerRoutes/homeRoute';
import logger from '../util/logger';

const host = envReader.SITE_HOST;
const port = envReader.SITE_PORT;

const app = express();

app.use(express.static('build/server'));
app.use('/client', express.static('build/client'));
app.use('/build', express.static('build'));

app.use(ping);
app.use(homeRoute);
// ---- errorHandler for 404 ----
app.use((err, req, res, next) => {
    errorHandler(err, req, res);
});
// ---- errorHandler for unhandledRejection ----
process.on('unhandledRejection', (err) => {
    const error = `[unhandledRejection] ${err.stack}` || err.message;
    logger.log(error);
});

logger.log(`[Index][HTTP] Server starting on http://${host}:${port}`);
const httpOptions = {
  hostname: host,
  port,
};
const httpServer = http.createServer(httpOptions, app);
httpServer.listen(port, (err) => {
  if (err) {
    logger.log(err);
  }
  const message = `[Index][HTTP] Server running on http://${host}:${port}`;
  logger.log(message);

  if (envReader.APP_ENV === 'development') {
    open(`http://${host}:${port}`);
  }
});
