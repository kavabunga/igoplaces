const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorRouter = require('./routes/errors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(cookieParser());

// мидлвэр-костыль авторизации
// _id: '63c48d5bd1bbdceac4b3cc5e'
// app.use((req, res, next) => {
//   req.user = {
//     _id: '63c48d5bd1bbdceac4b3cc5e',
//   };

//   next();
// });

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', errorRouter);

// обработчики ошибок
// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик
// app.use((err, req, res, next) => {
// });

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
