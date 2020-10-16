const mongoose = require('mongoose');
const validator = require('validator');
const { errorMessage } = require('../constants/messages');

/**
 * article schema for mongo
 */
const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: errorMessage.INVALID_URL,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: errorMessage.INVALID_URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'user',
    required: true,
    select: false,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model('article', articleSchema);
