let express = require("express");
const {
  signin,
  signup,
  getUser,
  signout,
} = require("../controllers/user-controller");
const { verifyToken, checkSchema } = require("../middleware/helperFunctions");
const {
  getMoviesList,
  getMovie,
  handleFavorite,
} = require("../controllers/movie-controller");
const { createReview } = require("../controllers/review-controller");

const router = express.Router();

router.post("/createReview", verifyToken, createReview);

module.exports = router;
