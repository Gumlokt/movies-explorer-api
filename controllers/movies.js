const Movie = require('../models/movie');
const messages = require('../config/messages');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
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
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => Movie.findById(movie._id)
      .populate(['owner'])
      .orFail(new NotFoundError(messages.filmIsAbsent))
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new BadRequestError(messages.incorrectFilmsId));
        }

        next(err);
      }))
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(`${messages.dataDidNotValidated}: ${err.message}`),
        );
      }

      next(err);
    });
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(messages.filmIsAbsent))
    .then((movieToRemove) => {
      if (movieToRemove.owner._id.toString() === req.user._id) {
        Movie.findOneAndRemove({
          _id: req.params.movieId,
          owner: { _id: req.user._id },
        })
          .orFail(new NotFoundError(messages.filmIsAbsent))
          .then((movie) => {
            res
              .status(200)
              .send({ data: movie, message: messages.filmIsDeleted });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError(messages.invalidFilmsId));
            }

            next(err);
          });
      } else {
        next(new ForbiddenError(messages.forbiddenToDelete));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.invalidFilmsId));
      }

      next(err);
    });
};
