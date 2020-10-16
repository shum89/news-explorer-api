const { isCelebrateError } = require('celebrate');
/**
 * custom celebrate error handler
 * @param err
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
const errorHandling = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const regex = /[^a-zA-Z ]/g;
    const errorMessage = err.details
      .get('body')
      .details[0].message.replace(regex, '');
    return res.send({
      message: errorMessage,
    });
  }
  return next(err);
};

module.exports = {
  errorHandling,
};
