import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
function CardForm({ review, handleSubmit, handleChange }) {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={review.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </Form.Group>

        {/* Subtitle */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Subtitle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subtitle"
            value={review.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
          />
        </Form.Group>

        {/* Content (Bigger Text Box) */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Content</Form.Label>
          <div style={{ minHeight: "200px", background: "#fff" }}>
            <ReactQuill
              value={review.content}
              onChange={(value) => handleChange("content", value)}
              placeholder="Write your review here..."
              style={{ height: "200px" }}
            />
          </div>
        </Form.Group>

        {/* Submit Button */}
        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-3 review-btn"
        >
          Submit Review
        </Button>
      </Form>
    </div>
  );
}

CardForm.propTypes = {};

export default CardForm;
