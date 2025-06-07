const { default: axios } = require("axios");
const { movieList, movieItem } = require("../mock");
const User = require("../models/user-schema");
const MyError = require("../models/MyError");
require("dotenv").config();

const getMoviesList = async (req, res, next) => {
  if (process.env.USE_API == "true") {
    console.log(req.query.query, req.query.page, "test", req.query);
    const url = `https://api.themoviedb.org/3/search/movie?query=${req.query.query}&include_adult=false&language=en-US&page=${req.query.page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWZjNzAxM2EyNWI4YzVkOTk3ZjI2NzJhMzBjYjM1OSIsIm5iZiI6MTYzODY5NTMxMy4zMzksInN1YiI6IjYxYWM4MTkxN2Y2YzhkMDAxOTA0MGM0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZmJ3xjiBFuyBgBkZQ6QMyZSQa-4LNZMhdxDvdKyM1Ec",
      },
    };
    try {
      const response = await axios.get(url, options);
      //console.log(response.data);
      return res.json({ data: response.data, status: "ok" });
    } catch (error) {
      console.log(error);
      return res.json({ data: error, status: "error" });
    }
  } else {
    return res.json({ data: movieList, status: "ok" });
  }
};
const getMovie = async (req, res, next) => {
  if (process.env.USE_API == "true") {
    const url = `https://api.themoviedb.org/3/movie/${req.params.id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWZjNzAxM2EyNWI4YzVkOTk3ZjI2NzJhMzBjYjM1OSIsIm5iZiI6MTYzODY5NTMxMy4zMzksInN1YiI6IjYxYWM4MTkxN2Y2YzhkMDAxOTA0MGM0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZmJ3xjiBFuyBgBkZQ6QMyZSQa-4LNZMhdxDvdKyM1Ec",
      },
    };
    try {
      const response = await axios.get(url, options);
      //console.log(response.data);
      return res.json({ data: response.data, status: "ok" });
    } catch (error) {
      console.log(error);
      return res.json({ data: error, status: "error" });
    }
  } else {
    return res.json({ data: movieItem, status: "ok" });
  }
};
const handleFavorite = async (req, res, next) => {
  try {
    let { movie, like } = req.body;
    const user = await User.findById(req.user?.id);
    if (user) {
      if (like) {
        //like true, add to favorite

        user.favoriteMovies.push(movie);
        await user.save();
        return res.json({ data: user, status: "ok" });
      }
      user.favoriteMovies = user.favoriteMovies.filter(
        (fav) => fav.id !== movie.id
      );

      await user.save();
      //like false, remove favorite
      return res.json({ data: user, status: "ok" });
    }
    let err = new MyError("User Not Found", 404);
    return next(err);
  } catch (error) {
    let err = new MyError("Unknown Error", 500);
    return next(err);
  }
};
module.exports = {
  getMoviesList,
  getMovie,
  handleFavorite,
};
