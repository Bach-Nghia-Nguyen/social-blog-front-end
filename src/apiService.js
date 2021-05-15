import axios from "axios";
import { toast } from "react-toastify";
import { alertActions } from "./redux/actions";
import store from "./redux/store";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    if (response.data.data.accessToken) {
      api.defaults.headers.common["authorization"] =
        "Bearer " + response.data.data.accessToken;
      localStorage.setItem("accessToken", response.data.data.accessToken);
    }
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    let errorMsg = error.message || "";
    if (error.errors && error.errors.message)
      errorMsg = errorMsg + ": " + error.errors.message;
    store.dispatch(alertActions.setAlert(errorMsg, "danger"));
    toast.error(errorMsg);
    return Promise.reject(error);
  }
);

export default api;
