import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DEFAULT_IMAGE = "./images.png"; // Placeholder image

const MovieItem = ({ movie }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
      className="movie-item"
    >
      <Card
        as={Link}
        to={`/movie-page/${movie.id}`}
        style={{ width: "18rem", height: "100%", cursor: "pointer" }}
        className="shadow-lg card-div"
      >
        <Card.Img
          variant="top"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : DEFAULT_IMAGE
          }
          alt={movie.title}
          style={{
            height: "270px",
            objectFit: "cover",
            objectPosition: "10% 0%",
          }} // Ensures uniform image size
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-center">{movie.title}</Card.Title>
          <Card.Text
            className="flex-grow-1 text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            <strong>Rating:</strong> {movie.vote_average} ⭐ ({movie.vote_count}{" "}
            votes)
          </Card.Text>
          <Card.Text>
            <strong>Release Date:</strong> {movie.release_date}
          </Card.Text>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieItem;
