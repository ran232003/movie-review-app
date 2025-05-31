const mongoose = require("mongoose");

const favoriteMovieSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Movie ID from API
  title: { type: String, required: true },
  poster_path: { type: String }, // Store movie poster URL
  release_date: { type: String }, // Date as string (e.g., "2023-05-10")
  vote_average: { type: Number, default: 0 }, // Average rating
  vote_count: { type: Number, default: 0 }, // Number of votes
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensure emails are unique
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    favoriteMovies: {
      type: [favoriteMovieSchema], // Embedded array of favorite movies
      default: [], // Start with an empty array at signup
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
