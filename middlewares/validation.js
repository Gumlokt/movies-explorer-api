/* eslint-disable newline-per-chained-call */
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

module.exports.unAuthorizedRequestsValidation = celebrate({
  body: {
    name: Joi.string().min(2).max(30).messages({
      "string.min": "Поле Имя должно быть миниммум 2 символа",
      "string.max": "Поле Имя должно быть максимум 30 символа",
    }),
    email: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isEmail(value)) {
          return value;
        }

        return helper.message("Указан не валидный E-Mail");
      })
      .messages({
        "any.required": "E-Mail - обязательное поле",
      }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Пароль должен быть длиной не менее 8 символов",
      "any.required": "Пароль - обязательное поле",
    }),
  },
});

module.exports.authorizedRequestsValidation = celebrate({
  params: {
    movieId: Joi.string().min(24).max(24).hex().messages({
      "string.min": "Длина идентификатора фильма - 24 символа",
      "string.max": "Длина идентификатора фильма - 24 символа",
      "string.hex": "Идентификатор фильма - шестнадцатиричная строка",
    }),
  },
  body: {
    country: Joi.string().required().messages({
      "any.required": "Пароль - обязательное поле",
    }),
    director: Joi.string().required().messages({
      "any.required": "Пароль - обязательное поле",
    }),
    duration: Joi.number().required().messages({
      "any.required": "Пароль - обязательное поле",
    }),
    year: Joi.string().required().messages({
      "any.required": "Пароль - обязательное поле",
    }),
    description: Joi.string().required().messages({
      "any.required": "Пароль - обязательное поле",
    }),
    image: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message("Указан не валидный URL");
    }),
    trailer: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message("Указан не валидный URL");
    }),
    thumbnail: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message("Указан не валидный URL");
    }),
    nameRU: Joi.string().required().messages({
      "any.required": "Пароль - обязательное поле",
    }),
    nameEN: Joi.string().required().messages({
      "any.required": "Пароль - обязательное поле",
    }),
  },
});

module.exports.checkAuthHeader = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().messages({
      "any.required": "Заголовок Authorization - обязательное поле",
    }),
  }).unknown(),
});
