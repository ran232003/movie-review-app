import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import "./ReviewForm.css";
import CardForm from "./components/CardForm";
import { useApiHelper } from "../../global/apiHelper";
import { useDispatch } from "react-redux";
import { CREATE_REVIEW_URL, EDIT_REVIEW_URL } from "../../URLS";
import { toastAction } from "../../store/toastSlice";
import { userAction } from "../../store/userSlice";
import PageWrapper from "../../global/PageWrapper ";
import { reviewAction } from "../../store/ReviewSlice";
const ReviewForm = () => {
  const location = useLocation();
  const state = location?.pathname.includes("edit") ? "edit" : "create";

  const defaultReview =
    state === "create"
      ? {
          title: "",
          subtitle: "",
          content: "",
        }
      : {
          title: location.state.review.title,
          subtitle: location.state.review.subtitle,
          content: location.state.review.content,
        };

  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const [review, setReview] = useState(defaultReview);

  const handleChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "create") {
      let { id, title, poster_path } = location.state.movie;
      let payload = {
        movieId: id,
        movieTitle: title,
        poster_path: poster_path,
        ...review,
      };
      handleApiCall(
        "POST",
        CREATE_REVIEW_URL,
        payload,
        (data) => {
          if (data.status === "ok") {
            dispatch(reviewAction.setReview(data.data));
          }

          // navigate("/");
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      //edit
      let { _id } = location.state.review;
      let payload = { ...review, id: _id };
      handleApiCall(
        "POST",
        EDIT_REVIEW_URL,
        payload,
        (data) => {
          if (data.status === "ok") {
            dispatch(reviewAction.setReview(data.data));
          }

          // navigate("/");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <PageWrapper>
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
              state={state}
              handleSubmit={handleSubmit}
            />
          </Card.Body>
        </Card>
      </Container>
    </PageWrapper>
  );
};

export default ReviewForm;
