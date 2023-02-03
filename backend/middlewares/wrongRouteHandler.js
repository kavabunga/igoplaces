const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

module.exports = (req, res, next) => {
  const err = new DocumentNotFoundError('Запрашиваемый адрес недоступен');
  next(err);
};
