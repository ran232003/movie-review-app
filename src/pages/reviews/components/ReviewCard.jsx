import React from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const naigate = useNavigate();
  const { poster_path, movieTitle, userId, title, subtitle } = review;
  const handleNavigation = () => {
    naigate(`/ReviewContent/${movieTitle}`, {
      state: { review },
    });
  };
  return (
    <Card
      onClick={handleNavigation}
      className="shadow-sm rounded card-div"
      style={{
        width: "300px", // fixed or maxWidth
        flex: "0 0 auto",
        cursor: "pointer",
      }}
    >
      <div className="d-flex">
        {/* Left: Movie Poster */}
        <Card.Img
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={movieTitle}
          style={{
            width: "130px",
            objectFit: "cover",
            borderTopLeftRadius: "0.375rem",
            borderBottomLeftRadius: "0.375rem",
          }}
        />

        {/* Right: Content */}
        <Card.Body>
          {/* Movie Title */}
          <Card.Title className="mb-0">{movieTitle}</Card.Title>
          {/* User Name */}
          <Card.Subtitle className="mb-2 text-muted">
            by {userId.userName}
          </Card.Subtitle>

          {/* Review Title */}
          <h5 className="fw-bold mt-2">{title}</h5>
          {/* Review Subtitle */}
        </Card.Body>
      </div>
    </Card>
  );
};

export default ReviewCard;
