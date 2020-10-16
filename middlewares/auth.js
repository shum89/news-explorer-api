const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/UnauthorisedError');
const { errorMessage } = require('../constants/messages');
/**
 * authorisation middleware
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new UnauthorisedError({ message: errorMessage.AUTH_REQUIRED });
  }
  req.user = payload;
  next();
};
