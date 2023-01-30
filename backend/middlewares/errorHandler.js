const { isCelebrateError } = require('celebrate');
const mongoose = require('mongoose');
const HttpError = require('../errors/HttpError');
const { errorCodes } = require('../util/constants.ts');

module.exports.errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    res.status(errorCodes.HTTP_CONFLICT).send({ message: 'Пользователь с таким email уже зарегистрирован' });
    return;
  }
  if (isCelebrateError(err)) {
    res.status(errorCodes.HTTP_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(errorCodes.HTTP_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err instanceof mongoose.Error.CastError) {
    res.status(errorCodes.HTTP_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }
  res.status(errorCodes.HTTP_DEFAULT_ERROR).send({ message: 'Ошибка по-умолчанию' });
};
