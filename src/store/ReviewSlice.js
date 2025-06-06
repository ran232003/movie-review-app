import { createSlice } from "@reduxjs/toolkit";
const reviewSlice = createSlice({
  name: "review",
  initialState: { reviewsArray: [], allReviews: [] },
  reducers: {
    setReview(state, action) {
      state.reviewsArray = action.payload;
    },
    setAllReview(state, action) {
      state.allReviews = action.payload;
    },
  },
});

export default reviewSlice;

export const reviewAction = reviewSlice.actions;
