const User = require('../models/user');
const messages = require('../config/messages');

const { BadRequestError, NotFoundError } = require('../errors');

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(messages.userIsAbsent))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.invalidUserId));
      }

      next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(new NotFoundError(messages.userIsAbsent))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(`${messages.dataDidNotValidated}: ${err.message}`),
        );
      }

      if (err.name === 'CastError') {
        next(new BadRequestError(messages.invalidUserId));
      }

      next(err);
    });
};
