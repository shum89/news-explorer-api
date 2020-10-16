const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorisedError = require('../errors/UnauthorisedError');
const { errorMessage } = require('../constants/messages');

/**
 * user schema for mongo
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
    message: errorMessage.INVALID_EMAIL,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorisedError({ message: errorMessage.INCORRECT_AUTH_DATA });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorisedError({ message: errorMessage.INCORRECT_AUTH_DATA });
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
