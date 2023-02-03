const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError('Необходима авторизация. Не передан токен');
  }
  const token = req.cookies.jwt;
  const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', (err, decoded) => {
    if (err) {
      throw new UnauthorizedError('Необходима авторизация. Ошибка проверки токена');
    } else {
      return decoded;
    }
  });
  req.user = payload;
  next();
};
