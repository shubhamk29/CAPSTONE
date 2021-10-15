import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";

import { useHistory } from "react-router-dom";

const MainListItems = () => {
  const history = useHistory();
  return (
    <List>
      <Divider />
      <ListItem
        button
        onClick={() => {
          history.push("/police/user/complaints");
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
          localStorage.removeItem("is-police-login");
          localStorage.removeItem("policeFullName");
          localStorage.removeItem("policeId");
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
