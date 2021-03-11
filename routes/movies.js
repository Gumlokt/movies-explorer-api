const router = require("express").Router();
const { authorizedRequestsValidation } = require("../middlewares/validation");

const {
  getMovies,
  createMovie,
  removeMovie,
} = require("../controllers/movies");

router.get("/movies", getMovies); // not to validate

router.post("/movies", authorizedRequestsValidation, createMovie);

router.delete("/movies/:movieId", authorizedRequestsValidation, removeMovie);

module.exports = router;
