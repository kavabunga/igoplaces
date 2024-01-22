const { ALLOWED_CORS } = process.env;

module.exports.errorCodes = {
  HTTP_BAD_REQUEST: 400,
  HTTP_UNAUTHORIZED: 401,
  HTTP_FORBIDDEN: 403,
  HTTP_NOT_FOUND: 404,
  HTTP_CONFLICT: 409,
  HTTP_DEFAULT_ERROR: 500,
};

module.exports.allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports.allowedCors = ALLOWED_CORS.split(', ');
