import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function AdminRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

export default AdminRoute;
