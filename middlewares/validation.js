const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const messages = require('../config/messages');

module.exports.userNameValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': messages.minUserNameLength,
        'string.max': messages.maxUserNameLength,
        'any.required': messages.userNameIsRequired,
      }),
  }).unknown(),
});

module.exports.userEmailValidation = celebrate({
  body: Joi.object({
    email: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isEmail(value)) {
          return value;
        }

        return helper.message(messages.invalidUserEmail);
      })
      .messages({
        'any.required': messages.emailIsRequired,
      }),
  }).unknown(),
});

module.exports.passwordValidation = celebrate({
  body: Joi.object({
    password: Joi.string().min(8).required().messages({
      'string.min': messages.minPassLength,
      'any.required': messages.passIsRequired,
    }),
  }).unknown(),
});

module.exports.createMovieValidation = celebrate({
  body: {
    country: Joi.string().required().messages({
      'any.required': messages.countryIsRequired,
    }),
    director: Joi.string().required().messages({
      'any.required': messages.directorIsRequired,
    }),
    duration: Joi.number().required().messages({
      'any.required': messages.durationIsRequired,
    }),
    year: Joi.string().required().messages({
      'any.required': messages.yearIsRequired,
    }),
    description: Joi.string().required().messages({
      'any.required': messages.descriptionIsRequired,
    }),
    image: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message(messages.invalidPosterURL);
    }),
    trailer: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message(messages.invalidTrailerURL);
    }),
    thumbnail: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message(messages.invalidThumbnailURL);
    }),
    movieId: Joi.number().required().messages({
      'any.required': messages.moviesExplorerIdRequired,
    }),
    nameRU: Joi.string().required().messages({
      'any.required': messages.nameRuRequired,
    }),
    nameEN: Joi.string().required().messages({
      'any.required': messages.nameEnRequired,
    }),
  },
});

module.exports.removeMovieValidation = celebrate({
  params: {
    movieId: Joi.string().min(24).max(24).hex()
      .messages({
        'string.min': messages.movieIdLength,
        'string.max': messages.movieIdLength,
        'string.hex': messages.hexStringRequired,
      }),
  },
});

module.exports.checkAuthHeader = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().messages({
      'any.required': messages.authorizationHeaderRequired,
    }),
  }).unknown(),
});
