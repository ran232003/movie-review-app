import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./global/NavigationBar";
import LandingPage from "./pages/LandingPage";
import AuthForm from "./pages/auth/AuthForm";
import NotFound from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";
import { useApiHelper } from "./global/apiHelper";
import { useDispatch } from "react-redux";
import { GET_USER_URL } from "./URLS";
import { userAction } from "./store/userSlice";
import ToastMessage from "./global/ToastMessage";
import MovieSearch from "./pages/movieSearch/MovieSearch";
import MoviePage from "./pages/moviePage/MoviePage";
import Loading from "./global/LoadingSpinners";
import FavoritePage from "./pages/favorites/FavoritePage";
import ReviewForm from "./pages/reviewForm/ReviewForm";
import PrivateAuth from "./global/PrivateAuth.jsx";
import ReviewPage from "./pages/reviews/ReviewPage.jsx";
import ReviewContent from "./pages/reviews/reviewShow/ReviewContent.jsx";

function App() {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const getUser = () => {
    handleApiCall(
      "GET",
      GET_USER_URL,
      {},
      (data) => {
        dispatch(userAction.setUser(data.user));

        // navigate("/");
      },
      (error) => {
        console.log(error);
        dispatch(userAction.removeUser());
      }
    );
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route index element={<LandingPage />} />
            <Route path="/auth/signup" element={<AuthForm />} />
            <Route path="/auth/signin" element={<AuthForm />} />
            <Route path="/movieSearch" element={<MovieSearch />} />
            <Route path="/movie-page/:id" element={<MoviePage />} />
            <Route path="/ReviewContent/:id" element={<ReviewContent />} />
            <Route element={<PrivateAuth />}>
              <Route path="favorites" element={<FavoritePage />} />
              <Route path="ReviewForm" element={<ReviewForm />} />
              <Route path="ReviewPage" element={<ReviewPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastMessage />
        <Loading />
      </AnimatePresence>
    </>
  );
}

export default App;
