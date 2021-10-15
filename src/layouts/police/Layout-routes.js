import React from "react";
import { Route, Redirect } from "react-router-dom";

import PoliceLayout from "./Layout";

const LayoutRoutes = ({ component: Component, isPrivate, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isPrivate === "true" ? (
          localStorage.getItem("is-police-login") === "true" ? (
            <PoliceLayout>
              <Component {...props} />
            </PoliceLayout>
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <PoliceLayout>
            <Component {...props} />
          </PoliceLayout>
        )
      }
    />
  );
};

export default LayoutRoutes;
