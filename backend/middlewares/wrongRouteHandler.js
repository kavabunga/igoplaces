const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

module.exports = (req, res, next) => {
  const err = new DocumentNotFoundError('Requested route is not available');
  next(err);
};
