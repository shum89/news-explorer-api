const BadRequestError = require('../errors/BadRequestError');
const { errorMessage } = require('../constants/messages');
/**
 * middleware for checking password
 * @param req
 * @param res
 * @param next
 */
const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim()) {
    throw new BadRequestError(errorMessage.PASSWORD_EMPTY);
  } else if (password.length < 8) {
    throw new BadRequestError(errorMessage.PASSWORD_SHORT);
  }
  next();
};

module.exports = {
  checkPassword,
};
