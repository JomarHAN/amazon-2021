import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function SellerRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo.isSeller ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default SellerRoute;
