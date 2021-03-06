const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY, SECRET_TTL } = require('../config');
const messages = require('../config/messages');

const User = require('../models/user');

const { BadRequestError, ConflictError } = require('../errors');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(messages.emailAlreadyExists);
      }

      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            email,
            password: hash,
          });
        })
        .then((createdUser) => res.status(200).send({ data: createdUser }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(
              new BadRequestError(
                `${messages.dataDidNotValidated}: ${err.message}`,
              ),
            );
          }

          next(err);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: SECRET_TTL,
      });
      res.status(200).send({ token });
    })
    .catch(next);
};
