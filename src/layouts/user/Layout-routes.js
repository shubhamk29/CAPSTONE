import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserLayout from "layouts/user/Layout";
const LayoutRoutes = ({ component: Component, isPrivate, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isPrivate === "true" ? (
          localStorage.getItem("is-user-login") === "true" ? (
            <UserLayout>
              <Component {...props} />
            </UserLayout>
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <UserLayout>
            <Component {...props} />
          </UserLayout>
        )
      }
    />
  );
};

export default LayoutRoutes;
