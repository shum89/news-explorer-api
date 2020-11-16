const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const DuplicateEntryError = require('../errors/DuplicateEntryError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { errorName, successMessage, errorMessage } = require('../constants/messages');
const { errorCode } = require('../constants/statusConstants');

const { JWT_SECRET } = require('../config');

/**
 * sign up user
 * @param req
 * @param res
 * @param next
 */
const createUser = (req, res, next) => {
  const { name, password, email } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash })
      .catch((err) => {
        if (err.name === errorName.VALIDATION_ERROR) {
          throw new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
        } else if (err.name === errorName.DUPLICATE_DATA || err.code === errorCode.MONGO_ERROR) {
          throw new DuplicateEntryError({ message: errorMessage.DUPLICATE_EMAIL });
        } else {
          next(err);
        }
      })
      .then((user) => {
        res.send({ name: user.name, email: user.email });
      })
      .catch(next));
};

/**
 * get user info
 * @param req
 * @param res
 * @param next
 */
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail().catch(() => {
      throw new NotFoundError({ message: errorMessage.USER_NOT_FOUND });
    })
    .then((user) => {
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

/**
 * login
 * @param req
 * @param res
 * @param next
 * @return {Promise<T>}
 */
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password).then((user) => {
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: 'none',
    }).send({ message: successMessage.AUTH_SUCCESSFUL });
  }).catch(next);
};

module.exports = {
  createUser,
  getUser,
  login,
};
