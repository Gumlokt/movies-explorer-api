const Movie = require("../models/movie");

const { BadRequestError, NotFoundError, ForbiddenError } = require("../errors");

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(["owner"])
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
  })
    .then(
      (movie) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        Movie.findById(movie._id)
          .populate(["owner"])
          .orFail(new NotFoundError("Фильм с указанным ID отсутствует"))
          .catch((err) => {
            if (err.name === "CastError") {
              next(new BadRequestError("Указан не валидный ID фильма"));
            }

            next(err);
          })
      // eslint-disable-next-line function-paren-newline
    )
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(`Данные не прошли валидацию: ${err.message}`));
      }

      next(err);
    });
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError("Фильм с указанным ID отсутствует"))
    .then((movieToRemove) => {
      if (movieToRemove.owner._id.toString() === req.user._id) {
        Movie.findOneAndRemove({
          _id: req.params.movieId,
          owner: { _id: req.user._id },
        })
          .orFail(new NotFoundError("Фильм с указанным ID отсутствует"))
          .then((movie) => {
            res.status(200).send({ data: movie, message: "Фильм удален" });
          })
          .catch((err) => {
            if (err.name === "CastError") {
              next(new BadRequestError("Указан не валидный ID фильма"));
            }

            next(err);
          });
      } else {
        next(new ForbiddenError("Нельзя удалять фильмы других пользователей"));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Указан не валидный ID фильма"));
      }

      next(err);
    });
};
