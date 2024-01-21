const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(
      new UnauthorizedError('Authorization needed. Token not present'),
    );
  }
  const token = req.cookies.jwt;
  const payload = jwt.verify(
    token,
    NODE_ENV === 'production' || NODE_ENV === 'dev'
      ? JWT_SECRET
      : 'some-secret-key',
    (err, decoded) => {
      if (err) {
        return next(
          new UnauthorizedError(
            'Authorization needed. Token verification error',
          ),
        );
      }
      return decoded;
    },
  );
  req.user = payload;
  return next();
};
