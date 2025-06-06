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
const {
  createReview,
  getUserReviews,
  editReview,
  getAllReviews,
} = require("../controllers/review-controller");

const router = express.Router();

router.post("/createReview", verifyToken, createReview);
router.post("/editReview", verifyToken, editReview);

router.get("/getUserReviews", verifyToken, getUserReviews);
router.get("/getAllReviews", verifyToken, getAllReviews);

module.exports = router;
