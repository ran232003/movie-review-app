// src/utils/apiHelper.js
import { apiCall } from "../apiCall";

import { useDispatch } from "react-redux";
import { loadingAction } from "../store/loadingData";
import { useNavigate } from "react-router-dom";
import MovieSearch from "../pages/movieSearch/MovieSearch";
import { moviePage, movieSearch } from "./mock";
import { toastAction } from "../store/toastSlice";

export const useApiHelper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleApiCall = async (
    method,
    url,
    body,
    onSuccess,
    onFailure,
    componentAction,
    dealy
  ) => {
    dispatch(loadingAction.toggleLoading(true));
    await new Promise((resolve) => setTimeout(resolve, (dealy = 1000)));

    try {
      const data = await apiCall(method, url, body);
      if (data.status === "ok") {
        onSuccess(data);
        dispatch(
          toastAction.setToast({ errorMessage: "Success", type: "success" })
        );
      } else {
        if (
          data?.message === "Token is invalid" ||
          data?.status === "Token is invalid"
        ) {
          navigate("/auth/signin");
        }
        if (data?.status === "error" || data?.status === "fail") {
          onFailure(data);
          dispatch(
            toastAction.setToast({ errorMessage: "Error", type: "error" })
          );
        }
      }
    } catch (error) {
      console.error(error);
      if (onFailure) {
        onFailure(error);
      }
    } finally {
      dispatch(loadingAction.toggleLoading(false));
    }
  };

  return { handleApiCall };
};
