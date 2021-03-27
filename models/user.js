const mongoose = require('mongoose');
const stringValidator = require('validator');
const bcrypt = require('bcryptjs');

const { UnauthorizedError } = require('../errors');
const messages = require('../config/messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return stringValidator.isEmail(v);
      },
      message: messages.incorrectEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function loggingin(email, password) {
  // this будет являться экземпляром модели User, создаваемым в controllers/users.js
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(messages.incorrectEmailOrPass),
        );
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(messages.incorrectEmailOrPass),
          );
        }

        return user; // но переменной user нет в этой области видимости
      });
    });
};

module.exports = mongoose.model('user', userSchema);
