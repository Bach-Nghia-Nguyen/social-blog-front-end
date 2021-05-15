import React from "react";
import { Route, Switch } from "react-router-dom";
import BlogDetailPage from "../BlogDetailPage";
import BlogEditorPage from "../BlogEditorPage";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import NotFoundPage from "../NotFoundPage";
import RegisterPage from "../RegisterPage";
import PrivateRoute from "../Routes/PrivateRoute";

const PublicLayout = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/blogs/:id" component={BlogDetailPage} />
        <PrivateRoute exact path="/blog/add" component={BlogEditorPage} />
        <PrivateRoute exact path="/blog/edit/:id" component={BlogEditorPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default PublicLayout;
