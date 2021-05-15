import { combineReducers } from "redux";
import alertReducers from "./alert.reducers";
import authReducers from "./auth.reducers";
import blogReducers from "./blog.reducers";
import routeReducers from "./route.reducers";
import userReducers from "./user.reducers";

export default combineReducers({
  blog: blogReducers,
  auth: authReducers,
  alert: alertReducers,
  route: routeReducers,
  user: userReducers,
});
