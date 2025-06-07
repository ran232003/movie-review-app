import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa"; // Import heart icon
import { useApiHelper } from "../../../global/apiHelper";
import { useDispatch, useSelector } from "react-redux";
import { FAVORITE_MOVIE_URL } from "../../../URLS";
import { toastAction } from "../../../store/toastSlice";
import { userAction } from "../../../store/userSlice";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function MovieDetails({ movie }) {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const navigate = useNavigate();
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const checkFav = user?.favoriteMovies.find((item) => {
    return movie.id === item.id;
  });
  const [liked, setLiked] = useState(checkFav); // Track heart state
  const handleLike = () => {
    const payLoad = { movie: movie, like: !liked };
    handleApiCall(
      "POST",
      FAVORITE_MOVIE_URL,
      payLoad,
      (data) => {
        if (data.status === "ok") {
          dispatch(userAction.setUser(data.data));

          setLiked(!liked);
        }

        // navigate("/");
      },
      (error) => {
        console.log(error);
        dispatch(
          toastAction.setToast({ errorMessage: "Error", type: "error" })
        );
      }
    );
  };
  const handleClick = () => {
    navigate("/ReviewForm", { state: { movie } });
  };
  return (
    <div className="movie-details" style={{ textAlign: "left" }}>
      {/* Title with Heart Icon */}
      <div className="movie-header">
        <h1>{movie.title}</h1>
        <FaHeart
          className={`heart-icon ${liked ? "liked" : ""}`}
          onClick={handleLike}
        />
      </div>

      {movie.homepage && (
        <p>
          <strong>Homepage:</strong>{" "}
          <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
            {movie.homepage}
          </a>
        </p>
      )}
      <p>
        <strong>Original Title:</strong> {movie.original_title}
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Budget:</strong> ${movie.budget.toLocaleString()}
      </p>
      <p>
        <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
      </p>
      <p>
        <strong>Runtime:</strong> {movie.runtime} mins
      </p>
      <p>
        <strong>Vote Average:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Vote Count:</strong> {movie.vote_count}
      </p>
      <Button onClick={handleClick}>Write Review</Button>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieDetails;
