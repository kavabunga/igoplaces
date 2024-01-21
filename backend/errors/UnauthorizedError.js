const HttpError = require('./HttpError');
const { errorCodes } = require('../util/constants');

module.exports = class UnauthorizedError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = errorCodes.HTTP_UNAUTHORIZED;
  }
};
