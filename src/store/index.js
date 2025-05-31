import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./userSlice";
import ToastSlice from "./toastSlice";
import LoadingSlice from "./loadingData";
import reviewSlice from "./ReviewSlice";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    toast: ToastSlice.reducer,
    loading: LoadingSlice.reducer,
    review: reviewSlice.reducer,
  },
});
export default store;
