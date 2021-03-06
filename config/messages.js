const messages = {
  emailAlreadyExists: 'Пользователь с указанным E-Mail уже зарегистрирован',
  dataDidNotValidated: 'Введенные данные не прошли валидацию',
  filmIsAbsent: 'Фильм с указанным ID отсутствует',
  incorrectFilmsId: 'Указан не валидный ID фильма',
  filmIsDeleted: 'Фильм удален',
  invalidFilmsId: 'Указан не валидный ID фильма',
  forbiddenToDelete: 'Нельзя удалять фильмы других пользователей',
  userIsAbsent: 'Пользователь с указанным ID отсутствует',
  invalidUserId: 'Указан не валидный ID пользователя',
  authorizationRequired:
    'Необходима авторизация. Отсутствует заголовок Authorization',
  incorrectToken: 'Необходима авторизация. Неверный token',
  serverError: 'Ошибка сервера',
  minUserNameLength: 'Поле Имя должно быть миниммум 2 символа',
  maxUserNameLength: 'Поле Имя должно быть максимум 30 символа',
  userNameIsRequired: 'Имя - обязательное поле',
  invalidUserEmail: 'Указан не валидный E-Mail',
  emailIsRequired: 'E-Mail - обязательное поле',
  minPassLength: 'Пароль должен быть длиной не менее 8 символов',
  passIsRequired: 'Пароль - обязательное поле',
  countryIsRequired: 'Страна - обязательное поле',
  directorIsRequired: 'Режиссер - обязательное поле',
  durationIsRequired: 'Продолжительность - обязательное поле',
  yearIsRequired: 'Год выпуска - обязательное поле',
  descriptionIsRequired: 'Описание - обязательное поле',
  invalidPosterURL: 'Указан не валидный URL постера',
  invalidTrailerURL: 'Указан не валидный URL трейлера',
  invalidThumbnailURL: 'Указан не валидный URL миниатюрного изображения',
  moviesExplorerIdRequired:
    'ID фильма из сервиса MoviesExplorer - обязательное поле',
  nameRuRequired: 'Наименование на русском - обязательное поле',
  nameEnRequired: 'Наименование на английском - обязательное поле',
  movieIdLength: 'Длина идентификатора фильма - 24 символа',
  hexStringRequired: 'Идентификатор фильма - шестнадцатиричная строка',
  authorizationHeaderRequired: 'Заголовок Authorization - обязательное поле',
  incorrectURL: 'Не корректный URL',
  incorrectEmail: 'Не корректный E-Mail',
  incorrectEmailOrPass: 'Неправильные E-Mail или пароль',
  requestedURINotFound: 'Запрашиваемый ресурс не найден',
};

module.exports = messages;
