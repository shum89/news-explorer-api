/**
 * error messages
 * @type {{INCORRECT_ARTICLE_DATA: string,
 * DUPLICATE_EMAIL: string,
 * USER_NOT_FOUND: string,
 * ARTICLE_REMOVE_DENIED: string,
 * INVALID_EMAIL: string,
 * NOT_FOUND: string,
 * ARTICLE_NOT_FOUND: string,
 * INVALID_URL: string,
 * INCORRECT_AUTH_DATA:
 * string, SERVER_ERROR: string,
 * AUTH_REQUIRED: string,
 * INCORRECT_DATE: string,
 * INCORRECT_USER_DATA: string}}
 */
const errorMessage = {
  INVALID_URL: 'Please enter valid URL',
  INVALID_EMAIL: 'Please enter valid email',
  ARTICLE_NOT_FOUND: 'User doesn\'t have article with this id',
  USER_NOT_FOUND: 'No user with this id',
  INCORRECT_USER_DATA: 'Incorrect user data',
  INCORRECT_ARTICLE_DATA: 'Incorrect article data',
  SERVER_ERROR: 'Server error',
  NOT_FOUND: 'Requested resource is not found',
  DUPLICATE_EMAIL: 'User with this email already exists',
  INCORRECT_AUTH_DATA: 'Incorrect email or password',
  AUTH_REQUIRED: 'Authorisation required',
  INCORRECT_DATE: 'Please enter valid date',
  PASSWORD_EMPTY: 'Password field cannot be empty',
  PASSWORD_SHORT: 'Password field cannot be less than 8 symbols long',
};
/**
 *
 * @type {
 * {
 * tooShort: string,
 * string: string,
 * invalid: string,
 * hex: string,
 * tooLong: string,
 * required: string,
 * redundant: string
 * }
 * }
 */
const requestValidationMessage = {
  required: '{#label} is required',
  invalid: 'please enter valid {#label}',
  tooShort: '{#label} is supposed to be minimum {#limit} symbols long',
  tooLong: '{#label} is supposed to be no more than a {#limit} symbols long',
  length: '{#label} is supposed {#limit} symbols long',
  redundant: '{#label} is redundant',
  string: '{#label} is supposed to be a string',
  hex: '{#label} is supposed to be hexadecimal',
};
/**
 * errorMessage names
 * @type {{DUPLICATE_DATA: string}}
 */
const errorName = {
  DUPLICATE_DATA: 'MongoError',
  VALIDATION_ERROR: 'ValidationError',
};
/**
 * success messages
 * @type {{AUTH_SUCCESSFUL: string}}
 */
const successMessage = {
  AUTH_SUCCESSFUL: 'Authorization successful',
  ARTICLE_DELETED: 'Article deleted',
};

module.exports = {
  errorMessage,
  errorName,
  successMessage,
  requestValidationMessage,
};
