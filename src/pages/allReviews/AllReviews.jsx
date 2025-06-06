import React, { useEffect } from "react";
import { useApiHelper } from "../../global/apiHelper";
import { useDispatch } from "react-redux";
import { reviewAction } from "../../store/ReviewSlice";
import { GET_ALL_REVIEWS_URL } from "../../URLS";
import ReviewPage from "../reviews/ReviewPage";

function AllReviews() {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = () => {
      handleApiCall(
        "GET",
        GET_ALL_REVIEWS_URL,
        {},
        (data) => {
          dispatch(reviewAction.setAllReview(data.data)); // or whatever your action is
        },
        (error) => {
          console.error("Error fetching reviews:", error);
        }
      );
    };

    fetchReviews();
  }, [handleApiCall, dispatch]);

  return (
    <div>
      <ReviewPage action="allReviews" />
    </div>
  );
}

export default AllReviews;
