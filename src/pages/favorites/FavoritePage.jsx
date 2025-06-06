import React from "react";
import PropTypes from "prop-types";
import MovieList from "../movieSearch/components/MovieList";
import { useSelector } from "react-redux";
import SearchReview from "../reviews/components/SearchReview";

function FavoritePage(props) {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const [tempReviews, setTempReviews] = React.useState(user.favoriteMovies);
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setTempReviews(user.favoriteMovies);
      return;
    }
    const filteredReviews = user.favoriteMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTempReviews(filteredReviews);
  };
  return (
    <div>
      <SearchReview handleSearch={handleSearch} />
      <MovieList movies={tempReviews} />
    </div>
  );
}

FavoritePage.propTypes = {};

export default FavoritePage;
