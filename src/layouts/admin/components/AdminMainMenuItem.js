import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";

const MainListItems = () => {
  const history = useHistory();
  return (
    <List>
      <Divider />
      <ListItem
        button
        onClick={() => {
          history.push("/admin/dashboard");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <Divider />
      <ListItem
        button
        onClick={() => {
          history.push("/admin/city");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Cities" />
      </ListItem>
      <Divider />
      <ListItem
        button
        onClick={() => {
          history.push("/admin/cityLocation");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="City Location" />
      </ListItem>
      <Divider />
      <ListItem
        button
        onClick={() => {
          history.push("/admin/police");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Police" />
      </ListItem>
      <Divider />
      <ListItem
        button
        onClick={() => {
          localStorage.removeItem("is-admin-login");
          localStorage.removeItem("adminFullName");
          history.push("/");
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>

      <Divider />
    </List>
  );
};

export { MainListItems };
