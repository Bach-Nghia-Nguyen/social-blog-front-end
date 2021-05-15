import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  return (
    <ToastContainer
      position="top-center"
      hideProgressBar={false}
      newestOnTop={true}
      pauseOnHover
    />
  );
};

export default Notification;
