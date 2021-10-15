import React from "react";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "layouts/admin/components/Theme";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainListItems } from "layouts/user/components/UserMainMenuItem";
import Button from "components/common/Button";
import useStyles from "layouts/user/styles/Layout";
import { useHistory } from "react-router-dom";
const Layout = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClickHandleLinks = (link) => {
    setOpen(false);
    history.push(link);
  };

  return (
    <ThemeProvider theme={Theme}>
      <div className={classes.root} style={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar
          style={{ flexGrow: 1 }}
          position="absolute"
          className={clsx(classes.appBar)}
        >
          <Toolbar className={classes.toolbar}>
            <div className={classes.sectionMobile}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div id="desktop-application-title-section">
              <div className={classes.applicationTitle}>
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: 16, fontWeight: "bolder" }}
                >
                  BENGALURU
                </Typography>

                <Typography
                  variant="subtitle2"
                  className={classes.applicationSubTitle}
                >
                  CRIME AUTHORITY
                </Typography>
              </div>
            </div>
            {localStorage.getItem("is-user-login") && (
              <div
                id="desktop-complain-section"
                style={{ marginLeft: 40 }}
                className={classes.sectionDesktop}
              >
                <Button onClick={() => history.push("/register-complaint")}>
                  Register Complaint
                </Button>
                <Button
                  mLeft={5}
                  onClick={() => history.push("/my-complaints")}
                >
                  My Complaints
                </Button>
              </div>
            )}

            <div style={{ flexGrow: 1 }}></div>
            <div
              style={{ marginRight: 40 }}
              id="desktop-auth-container-section"
              className={classes.sectionDesktop}
            >
              {localStorage.getItem("is-user-login") ? null : (
                <Button onClick={() => history.push("/register")}>
                  Register
                </Button>
              )}
              {localStorage.getItem("is-user-login") ? null : (
                <Button mLeft={5} onClick={() => history.push("/login")}>
                  Login
                </Button>
              )}
              <div style={{ flexGrow: 1 }}></div>
              {localStorage.getItem("is-user-login") && (
                <Typography component="h4" variant="h6" color="inherit" noWrap>
                  Welcome!{" "}
                  <span style={{ marginLeft: 5, marginRight: 10 }}>
                    {" "}
                    {localStorage.getItem("userFullName").toLocaleUpperCase()}
                  </span>
                </Typography>
              )}

              {localStorage.getItem("is-user-login") && (
                <Button
                  color="secondary"
                  mLeft={5}
                  onClick={() => {
                    localStorage.removeItem("is-user-login");
                    localStorage.removeItem("userFullName");
                    localStorage.removeItem("userId");
                    history.push("/");
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          className={classes.sectionMobile}
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <ListItem>
              <ListItemText primary=" BENGALURU" secondary="CRIME AUTHORITY" />
            </ListItem>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <MainListItems onClickHandleLinks={onClickHandleLinks} />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <div style={{ marginTop: 10, minHeight: "100vh" }}>
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
