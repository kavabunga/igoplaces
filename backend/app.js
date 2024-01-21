require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const { PORT = 3000, NODE_ENV } = process.env;
const app = express();

// Rate-limiter config
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: NODE_ENV === 'production' ? 10 : 1000,
});

// Limit and log requests
app.use(limiter);
app.use(requestLogger);

app.use(express.json());
app.use(cookieParser());

// Security
app.use(cors);
app.use(xss());
app.use(helmet());

// Crush test option (TO DELETE)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server is going to fail');
  }, 0);
});

// Main routing
app.use(router);

// Log errors
app.use(errorLogger);

// Process errors
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
