import React from "react";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import { Container, Row, Col } from "react-bootstrap";

const MovieList = ({ movies }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Col
              key={movie.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4 d-flex"
            >
              <MovieItem movie={movie} />
            </Col>
          ))
        ) : (
          <p className="text-center">No movies found.</p>
        )}
      </Row>
    </Container>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;
