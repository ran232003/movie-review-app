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

const router = express.Router();

router.get("/getMoviesList", getMoviesList);
router.get("/getMovie/:id", getMovie);
router.post("/favorite", verifyToken, handleFavorite);

module.exports = router;
