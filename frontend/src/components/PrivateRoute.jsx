import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default PrivateRoute;
