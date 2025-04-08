const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios");

const mongoose = require("mongoose");
const cors = require("cors");
const MyError = require("./models/MyError");
const userRouter = require("./routes/user-route");
const movieRouter = require("./routes/movie-routes");
const reviewRouter = require("./routes/review-routes");
// const stockRouter = require("./routes/stoke-route");

//const commentRouter = require("./routes/comment-routes");

const cookieParser = require("cookie-parser");
const User = require("./models/user-schema");

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your React app's domain
  credentials: true,
};
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
mongoose.connect("mongodb://localhost:27017/movie-review", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use("/api/movie/user", userRouter);
app.use("/api/movie/review", reviewRouter);
app.use("/api/movie/movies", movieRouter);
// app.use("/api/movie/stokes", stockRouter);

app.use((req, res, next) => {
  let error = new MyError("not able to find page");
  error.errorCode = 404;
  next(error);
});
const test = async () => {
  const url = "https://api.themoviedb.org/3/authentication";
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
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
test();
app.use(function (error, req, res, next) {
  //console.log(error);
  console.log("error controller", error.message);
  const errorCode = error.code || 500;
  const errorMsg = error.message || "unknown error occurd";
  const errorObject = error.errors || {};
  res.status(errorCode);
  res.json({ status: "fail", msg: errorMsg, errorObject });
});
