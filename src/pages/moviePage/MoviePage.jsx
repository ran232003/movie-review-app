import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./MoviePage.css"; // Import the CSS file
import { GET_MOVIE_URL } from "../../URLS";
import { useApiHelper } from "../../global/apiHelper";
import { useDispatch } from "react-redux";
import MovieDetails from "./components/MovieDetails";

const MoviePage = () => {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  let params = useParams();
  let id = params.id;
  const [movie, setMovie] = useState(null);
  const fetchMovie = () => {
    let url = GET_MOVIE_URL + id;
    handleApiCall(
      "GET",
      url,
      {},
      (data) => {
        setMovie(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  if (!movie) return <div className="error"></div>;
  return (
    <div className="movie-container">
      {/* Left Section - Movie Details */}
      <MovieDetails movie={movie} />

      {/* Right Section - Movie Poster */}
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
    </div>
  );
};

export default MoviePage;
