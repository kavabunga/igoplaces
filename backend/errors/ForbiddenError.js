const HttpError = require('./HttpError');
const { errorCodes } = require('../util/constants.ts');

module.exports = class ForbiddenError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = errorCodes.HTTP_FORBIDDEN;
  }
};
