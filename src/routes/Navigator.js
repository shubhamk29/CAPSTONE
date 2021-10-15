import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import {
  Dashboard,
  AddOrEditPolice,
  AddOrEditCity,
  AddOrEditLocation,
  AdminLayout,
  PoliceLayout,
  UserLayout,
  Home,
  Login,
  SignUp,
  RegisterComplaint,
  MyComplaints,
  Complaints,
} from "./Index";
import PageNotFound from "routes/PageNotFound";

const Navigator = () => {
  return (
    <Switch>
      <UserLayout exact path="/" component={Home} isPrivate="true" />

      <UserLayout exact path="/login" component={Login} isPrivate="false" />

      <UserLayout exact path="/register" component={SignUp} isPrivate="false" />

      <UserLayout
        exact
        path="/register-complaint"
        component={RegisterComplaint}
        isPrivate="true"
      />

      <UserLayout
        exact
        path="/my-complaints"
        component={MyComplaints}
        isPrivate="true"
      />

      <PoliceLayout
        exact
        path="/police/user/complaints"
        component={Complaints}
        isPrivate="true"
      />

      <AdminLayout
        exact
        path="/admin/dashboard"
        component={Dashboard}
        isPrivate="true"
      />
      <AdminLayout
        exact
        path="/admin/city"
        component={AddOrEditCity}
        isPrivate="true"
      />
      <AdminLayout
        exact
        path="/admin/cityLocation"
        component={AddOrEditLocation}
        isPrivate="true"
      />
      <AdminLayout
        exact
        path="/admin/police"
        component={AddOrEditPolice}
        isPrivate="true"
      />

      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default Navigator;
