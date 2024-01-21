const HttpError = require('./HttpError');
const { errorCodes } = require('../util/constants');

module.exports = class DocumentNotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'DocumentNotFoundError';
    this.statusCode = errorCodes.HTTP_NOT_FOUND;
  }
};
