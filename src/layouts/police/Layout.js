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
import Theme from "layouts/police/components/Theme";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainListItems } from "layouts/police/components/PoliceMainMenuItem";

import useStyles from "layouts/police/styles/Layout";

const Layout = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={Theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
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
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Dashboard
            </Typography>
            <div style={{ flexGrow: 1 }}></div>

            {localStorage.getItem("policeFullName") && (
              <Typography component="h4" variant="h6" color="inherit" noWrap>
                Welcome!{" "}
                <span style={{ marginLeft: 5, marginRight: 10 }}>
                  {" "}
                  {localStorage.getItem("policeFullName").toLocaleUpperCase()}
                </span>
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <ListItem>
              <ListItemText primary="Bengaluru" secondary="Crime Authority" />
            </ListItem>

            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <MainListItems />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              // backgroundColor: "lightgrey",
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
