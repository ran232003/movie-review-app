import { createSlice } from "@reduxjs/toolkit";
const reviewSlice = createSlice({
  name: "review",
  initialState: { reviewsArray: [] },
  reducers: {
    setReview(state, action) {
      state.reviewsArray = action.payload;
    },
  },
});

export default reviewSlice;

export const reviewAction = reviewSlice.actions;
