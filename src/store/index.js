import { configureStore, combineReducers } from "@reduxjs/toolkit";

import UserSlice from "./userSlice";
import ToastSlice from "./toastSlice";
import LoadingSlice from "./loadingData";
import reviewSlice from "./ReviewSlice";

// Combine all your slices
const appReducer = combineReducers({
  user: UserSlice.reducer,
  toast: ToastSlice.reducer,
  loading: LoadingSlice.reducer,
  review: reviewSlice.reducer,
});

// Root reducer to reset all state on logout
const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined; // this clears the state for all slices
  }
  return appReducer(state, action);
};

// Configure store with rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;
