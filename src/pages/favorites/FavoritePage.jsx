import React from "react";
import PropTypes from "prop-types";
import MovieList from "../movieSearch/components/MovieList";
import { useSelector } from "react-redux";

function FavoritePage(props) {
  const user = useSelector((state) => {
    return state.user.user;
  });
  return (
    <div>
      <MovieList movies={user.favoriteMovies} />
    </div>
  );
}

FavoritePage.propTypes = {};

export default FavoritePage;
