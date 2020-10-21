const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
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
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorisedError({ message: errorMessage.AUTH_REQUIRED });
  }
  req.user = payload;
  next();
};
