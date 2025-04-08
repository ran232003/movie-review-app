import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import "./ReviewForm.css";
import CardForm from "./components/CardForm";
import { useApiHelper } from "../../global/apiHelper";
import { useDispatch } from "react-redux";
import { CREATE_REVIEW_URL } from "../../URLS";
import { toastAction } from "../../store/toastSlice";
import { userAction } from "../../store/userSlice";
const ReviewForm = () => {
  const location = useLocation();
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const [review, setReview] = useState({
    title: "",
    subtitle: "",
    content: "",
  });

  const handleChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { id, title, poster_path } = location.state.movie;
    let payload = {
      movieId: id,
      movieTitle: title,
      poster_path: poster_path,
      ...review,
    };
    console.log("Review submitted:", payload);
    handleApiCall(
      "POST",
      CREATE_REVIEW_URL,
      payload,
      (data) => {
        if (data.status === "ok") {
          dispatch(userAction.setUser(data.user));
        }

        // navigate("/");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card
        className="p-4 mt-4 shadow-lg"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">
            Write a Movie Review
          </h2>
          <CardForm
            handleChange={handleChange}
            review={review}
            handleSubmit={handleSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReviewForm;
