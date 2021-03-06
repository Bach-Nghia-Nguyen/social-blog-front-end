import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./containers/Routes";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/actions";
import { ClipLoader } from "react-spinners";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faSearch,
  faUpload,
  faImage,
  faComments,
  faUserCircle,
  faBlog,
  faUsers,
  faPenFancy,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(
  fab,
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faSearch,
  faUpload,
  faImage,
  faComments,
  faUserCircle,
  faBlog,
  faUsers,
  faPenFancy
);

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated === undefined ? (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
          <ClipLoader color="#f86c6b" size={150} loading={true} />
        </div>
      ) : (
        <Router>
          <Routes />
        </Router>
      )}
    </>
  );
}

export default App;
