const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  let payload;

  try {
    const token = req.cookies.jwt;
    payload = jwt.verify(token, 'some-secret-key', (err, decoded) => {
      if (err) {
        throw new UnauthorizedError('Необходима авторизация. Ошибка проверки токена');
      } else {
        return decoded;
      }
    });
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};
