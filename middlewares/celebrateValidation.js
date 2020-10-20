const { isCelebrateError } = require('celebrate');
const BadRequestError = require('../errors/BadRequestError');
/**
 * custom celebrate error handler
 * @param err
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const regex = /[^a-zA-Z0-9 ]/g;
    const errorMessage = err.details.get('body') || err.details.get('params');
    throw new BadRequestError({ message: errorMessage.details.map((error) => error.message.replace(regex, '')).join(', ') });
  }
  return next(err);
};

module.exports = {
  celebrateErrorHandler,
};
