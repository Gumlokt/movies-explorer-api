const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');
const messages = require('../config/messages');
const UnauthorizedError = require('../errors/UnauthorizedError'); // 401 - что-то не так при аутентификации или авторизации

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(messages.authorizationRequired);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError(messages.incorrectToken);
  }

  req.user = payload;

  next();
};
