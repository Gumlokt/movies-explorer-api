const router = require('express').Router();
const {
  createMovieValidation,
  removeMovieValidation,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:movieId', removeMovieValidation, removeMovie);

module.exports = router;
