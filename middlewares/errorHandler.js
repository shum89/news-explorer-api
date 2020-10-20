const { statusCode } = require('../constants/statusConstants');
const { errorMessage } = require('../constants/messages');
/**
 * error handler
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports = (err, req, res, next) => {
  if (err.status !== statusCode.SERVER_ERROR) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `${errorMessage.SERVER_ERROR}: ${err.message}` });
  next();
};
