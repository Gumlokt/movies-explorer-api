const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

module.exports.userNameValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Поле Имя должно быть миниммум 2 символа",
      "string.max": "Поле Имя должно быть максимум 30 символа",
      "any.required": "поле name (Имя) - обязательное поле",
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

        return helper.message("Указан не валидный E-Mail");
      })
      .messages({
        "any.required": "E-Mail - обязательное поле",
      }),
  }).unknown(),
});

module.exports.passwordValidation = celebrate({
  body: Joi.object({
    password: Joi.string().min(8).required().messages({
      "string.min": "Пароль должен быть длиной не менее 8 символов",
      "any.required": "Пароль - обязательное поле",
    }),
  }).unknown(),
});

module.exports.createMovieValidation = celebrate({
  body: {
    country: Joi.string().required().messages({
      "any.required": "Страна - обязательное поле",
    }),
    director: Joi.string().required().messages({
      "any.required": "Режиссер - обязательное поле",
    }),
    duration: Joi.number().required().messages({
      "any.required": "Продолжительность - обязательное поле",
    }),
    year: Joi.string().required().messages({
      "any.required": "Год выпуска - обязательное поле",
    }),
    description: Joi.string().required().messages({
      "any.required": "Описание - обязательное поле",
    }),
    image: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message("Указан не валидный URL постера");
    }),
    trailer: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message("Указан не валидный URL трейлера");
    }),
    thumbnail: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message("Указан не валидный URL миниатюрного изображения");
    }),
    movieId: Joi.number().required().messages({
      "any.required": "ID фильма из сервиса MoviesExplorer - обязательное поле",
    }),
    nameRU: Joi.string().required().messages({
      "any.required": "Наименование на русском - обязательное поле",
    }),
    nameEN: Joi.string().required().messages({
      "any.required": "Наименование на английском - обязательное поле",
    }),
  },
});

module.exports.removeMovieValidation = celebrate({
  params: {
    movieId: Joi.string().min(24).max(24).hex().messages({
      "string.min": "Длина идентификатора фильма - 24 символа",
      "string.max": "Длина идентификатора фильма - 24 символа",
      "string.hex": "Идентификатор фильма - шестнадцатиричная строка",
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
