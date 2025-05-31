import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../Review.css";

function ReviewContent() {
  const location = useLocation();
  const { review } = location.state;
  console.log(review);

  if (!review) {
    return <div>No review found.</div>;
  }

  return (
    <div className="review-content-container">
      <Card className="review-card">
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500${review.poster_path}`}
          alt={review.movieTitle}
          className="movie-poster"
        />
        <Card.Body>
          <div className="movie-details">
            <h2 className="movie-title">{review.movieTitle}</h2>
            <p className="author">Reviewed by: {review.userId.userName}</p>
            <p className="date">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="review-details">
            <h3 className="review-title">{review.title}</h3>
            <h5 className="review-subtitle">{review.subtitle}</h5>
            <div
              className="review-content"
              dangerouslySetInnerHTML={{ __html: review.content }}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReviewContent;
