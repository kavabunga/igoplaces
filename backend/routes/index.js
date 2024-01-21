const router = require('express').Router();
const {
  validateUser,
  validateUserCredentials,
} = require('../middlewares/requestValidation');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser, signout } = require('../controllers/users');
const wrongRouteHandler = require('../middlewares/wrongRouteHandler');
const auth = require('../middlewares/auth');

// Authorization routes
router.post('/signin', validateUserCredentials, login);
router.post('/signup', validateUser, createUser);
router.post('/signout', signout);

// Authorization middleware
router.use(auth);

// Protected routes
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// Other routes considered wrong
router.use('*', wrongRouteHandler);

module.exports = router;
