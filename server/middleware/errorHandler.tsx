import logger from '../../util/logger';

const errorHandler = (err, req, res) => {
  const error = `Error from route ${req.url}, ${err} `;
  logger.log(error);

  res.end('Express server error occured!');
};

export default errorHandler;
