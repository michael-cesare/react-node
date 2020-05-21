import express from 'express';
import http from 'http';
import open from 'open';
import bodyParser from 'body-parser';
import envReader from '../envReader';
import errorHandler from './middleware/errorHandler';
import ping from './controllerRoutes/pingRoute';
import mainRouter from './controllerRoutes/mainRouter';
import migrationRouter from './controllerRoutes/migrationRouter';
import userRouter from './controllerRoutes/userRouter';
import logger from '../util/logger';

const host = envReader.SITE_HOST;
const port = envReader.SITE_PORT;

const app = express();

app.use('/favicon.ico', express.static('build/static/favicon.ico'));
app.use('/static', express.static('build/static'));
app.use('/client', express.static('build/client'));
app.use('/src', express.static('build/client'));
app.use('/build', express.static('build'));
app.use(express.static('build/server'));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(ping);
app.use(userRouter);
app.use(migrationRouter);
app.use(mainRouter);
// ---- errorHandler for 404 ----
app.use((err: any, req: any, res: any, next: any) => {
    errorHandler(err, req, res);
});
// ---- errorHandler for unhandledRejection ----
process.on('unhandledRejection', (err: any) => {
    const error = `[unhandledRejection] ${err.stack}` || err.message;
    logger.log(error);
});

logger.log(`[Index][HTTP] Server starting on http://${host}:${port}`);
const httpOptions: any = {
  hostname: host,
  port,
};
const httpServer = http.createServer(httpOptions, app);
httpServer.listen(port, () => {
  const message = `[Index][HTTP] Server running on http://${host}:${port}`;
  logger.log(message);

  if (envReader.APP_ENV === 'development') {
    open(`http://${host}:${port}`);
  }
});
