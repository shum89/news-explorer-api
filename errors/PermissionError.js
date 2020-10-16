/**
 * Custom error class for a permission error
 */
class PermissionError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 403;
  }
}
module.exports = PermissionError;
