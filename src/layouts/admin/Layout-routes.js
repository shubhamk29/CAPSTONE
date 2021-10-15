import React from "react";
import { Route, Redirect } from "react-router-dom";

import AdminLayout from "./Layout";

const LayoutRoutes = ({ component: Component, isPrivate, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isPrivate === "true" ? (
          localStorage.getItem("is-admin-login") === "true" ? (
            <AdminLayout>
              <Component {...props} />
            </AdminLayout>
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <AdminLayout>
            <Component {...props} />
          </AdminLayout>
        )
      }
    />
  );
};

export default LayoutRoutes;
