require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { validateUser, validateUserCredentials } = require('./middlewares/requestValidation');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const wrongRouteHandler = require('./middlewares/wrongRouteHandler');
const { login, createUser } = require('./controllers/users');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV } = process.env;
const app = express();

// подключаем rate-limiter
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: NODE_ENV === 'production' ? 10 : 100,
});

app.use(limiter);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(cors);
app.use(xss());
app.use(helmet());

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateUserCredentials, login);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', wrongRouteHandler);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
