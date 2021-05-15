import React from "react";
import { Route, Switch } from "react-router-dom";

import AlertMessage from "../../components/AlertMessage";
import NavigationBar from "../../components/NavigationBar";

import PublicLayout from "../layouts/PublicLayout";

import PrivateRoute from "./PrivateRoute";

import MemberLayout from "../layouts/MemberLayout";

const Routes = (props) => {
  return (
    <>
      <NavigationBar />
      <AlertMessage />
      <Switch>
        <PrivateRoute path="/member" component={MemberLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
    </>
  );
};

export default Routes;
