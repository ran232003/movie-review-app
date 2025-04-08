import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./userSlice";
import ToastSlice from "./toastSlice";
import LoadingSlice from "./loadingData";

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    toast: ToastSlice.reducer,
    loading: LoadingSlice.reducer,
  },
});
export default store;
