import React from "react";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import { useHistory } from "react-router-dom";
const MainListItems = ({ onClickHandleLinks }) => {
  const history = useHistory();
  return (
    <List>
      {localStorage.getItem("is-user-login") && (
        <>
          <Divider />
          <ListItem
            button
            onClick={() => {
              onClickHandleLinks("/register-complaint");
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Register Complaint" />
          </ListItem>
          <Divider />

          <ListItem
            button
            onClick={() => {
              onClickHandleLinks("/my-complaints");
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="My Complaints" />
          </ListItem>
          <Divider />
        </>
      )}

      {localStorage.getItem("is-user-login") ? null : (
        <ListItem
          button
          onClick={() => {
            onClickHandleLinks("/register");
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItem>
      )}

      <Divider />
      {localStorage.getItem("is-user-login") ? null : (
        <>
          <ListItem
            button
            onClick={() => {
              onClickHandleLinks("/login");
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <Divider />
        </>
      )}
      {localStorage.getItem("is-user-login") && (
        <>
          <ListItem
            button
            onClick={() => {
              localStorage.removeItem("is-user-login");
              localStorage.removeItem("userFullName");
              localStorage.removeItem("userId");
              history.push("/");
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          <Divider />
        </>
      )}
    </List>
  );
};

export { MainListItems };
