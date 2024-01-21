const mongoose = require('mongoose');
const HttpError = require('../errors/HttpError');
const { errorCodes } = require('../util/constants');

module.exports.errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res
      .status(errorCodes.HTTP_BAD_REQUEST)
      .send({ message: 'Переданы некорректные данные' });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res
      .status(errorCodes.HTTP_BAD_REQUEST)
      .send({ message: 'Переданы некорректные данные' });
  }
  res
    .status(errorCodes.HTTP_DEFAULT_ERROR)
    .send({ message: 'Ошибка по-умолчанию' });
  return next();
};
