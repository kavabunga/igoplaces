const HttpError = require('../errors/HttpError');
const { errorCodes } = require('../util/constants.ts');

module.exports.errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(errorCodes.HTTP_DEFAULT_ERROR).send({ message: 'Ошибка по-умолчанию' });
  next();
};
