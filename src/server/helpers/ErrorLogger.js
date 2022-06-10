const logger = require("@src/loggers/logger");

const logError = (err) => {
  logger.error(err);
};

const logErrorMiddleware = (err, req, res, next) => {
  logError(err);
  next(err);
};

const returnError = (err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.name);
};

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
};
