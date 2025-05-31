import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MovieList from "../movieSearch/components/MovieList";
import { useDispatch, useSelector } from "react-redux";
import { useApiHelper } from "../../global/apiHelper";
import { reviewAction } from "../../store/ReviewSlice";
import { GET_USER_REVIEWS_URL } from "../../URLS";
import ReviewCard from "./components/ReviewCard";
import SearchReview from "./components/SearchReview";
import "./Review.css";
function ReviewPage(props) {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => {
    console.log(state.review);
    return state.review.reviewsArray;
  });
  const [tempReviews, setTempReviews] = React.useState([]);
  useEffect(() => {
    setTempReviews(reviews);
  }, [reviews]);
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setTempReviews(reviews);
      return;
    }
    const filteredReviews = reviews.filter((review) =>
      review.movieTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTempReviews(filteredReviews);
  };
  const getReviews = () => {
    handleApiCall(
      "GET",
      GET_USER_REVIEWS_URL,
      {},
      (data) => {
        console.log(data.data);
        if (data.status === "ok") {
          dispatch(reviewAction.setReview(data.data));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    if (reviews.length === 0) {
      //checkdb
      getReviews();
    }
  }, []);
  console.log(tempReviews);
  return (
    <div>
      <SearchReview handleSearch={handleSearch} />
      <div
        className="d-flex flex-wrap gap-3 justify-content-start"
        style={{ padding: "1rem" }}
      >
        {tempReviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
