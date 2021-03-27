const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

const { login, createUser } = require('../controllers/auth');

const auth = require('../middlewares/auth');

const {
  userNameValidation,
  userEmailValidation,
  passwordValidation,
  checkAuthHeader,
} = require('../middlewares/validation');

const { NotFoundError } = require('../errors');
const messages = require('../config/messages');

router.post('/signin', userEmailValidation, passwordValidation, login);
router.post(
  '/signup',
  userNameValidation,
  userEmailValidation,
  passwordValidation,
  createUser,
);

router.use('/', checkAuthHeader, auth, usersRoutes);
router.use('/', checkAuthHeader, auth, moviesRoutes);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(messages.requestedURINotFound));
});

module.exports = router;
