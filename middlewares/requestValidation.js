const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');
const { requestValidationMessage } = require('../constants/messages');
const { errorMessage } = require('../constants/messages');

/**
 * URL validation
 * @param value
 * @return {*}
 */
const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError(errorMessage.INVALID_URL);
  }
  return value;
};

/**
 * register request validation
 */
const validateRegister = celebrate({
  body: Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
  }).messages({
    'string.base': requestValidationMessage.string,
    'string.email': requestValidationMessage.invalid,
    'string.min': requestValidationMessage.tooShort,
    'string.max': requestValidationMessage.tooLong,
    'string.required': requestValidationMessage.required,
    'object.unknown': requestValidationMessage.redundant,
  }),
});

/**
 * id validation
 */
const validateId = celebrate({
  params: Joi.object().options({ abortEarly: false }).keys({
    _id: Joi.string().hex().length(24),
  }).messages({
    'string.base': requestValidationMessage.string,
    'string.hex': requestValidationMessage.hex,
    'string.length': requestValidationMessage.length,
    'string.required': requestValidationMessage.required,
    'object.unknown': requestValidationMessage.redundant,
  }),
});

/**
 * login validation
 */
const validateLogin = celebrate({
  body: Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).messages({
    'string.base': requestValidationMessage.string,
    'string.min': requestValidationMessage.tooShort,
    'string.required': requestValidationMessage.required,
    'string.custom': requestValidationMessage.invalid,
    'object.unknown': requestValidationMessage.redundant,
  }),
});

/**
 * article validation
 */
const validateArticle = celebrate({
  body: Joi.object().options({ abortEarly: false }).keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateUrl),
    image: Joi.string().required().custom(validateUrl),
  }).messages({
    'string.base': requestValidationMessage.string,
    'string.required': requestValidationMessage.required,
    'string.custom': requestValidationMessage.invalid,
    'object.unknown': requestValidationMessage.redundant,
  }),
});

module.exports = {
  validateRegister,
  validateId,
  validateLogin,
  validateArticle,
};
