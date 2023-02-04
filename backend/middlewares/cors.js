const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'https://nostromo.nomoredomainsclub.ru',
  'localhost:3000',
];

module.exports = (req, res, next) => {
  const { method, origin } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
    return;
  }
  next();
};
