const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { validateCredentials } = require('./middlewares/requestValidation');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const wrongRouteHandler = require('./middlewares/wrongRouteHandler');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', validateCredentials, login);
app.post('/signup', validateCredentials, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', wrongRouteHandler);

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
