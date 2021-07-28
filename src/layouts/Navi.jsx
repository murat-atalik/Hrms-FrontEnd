import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  Typography,
  AppBar,
  IconButton,
  Toolbar,
  makeStyles,
  Grid,
} from "@material-ui/core";
import SignedIn from "./SignedIn";
import SignedOut from "./SıgnedOut";
import { ImHome } from "react-icons/im";
import { useSelector } from "react-redux";

export default function Navi() {
  const { authItem } = useSelector((state) => state.auth);
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "#263238",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            aria-label="menu"
            component={NavLink}
            to="/home"
            style={{ color: "white" }}
          >
            <Typography variant="h6" className={classes.title}>
              <ImHome size="1em" /> ANA SAYFA
            </Typography>
          </IconButton>

          <Grid container justify="flex-end">
            {authItem[0].loggedIn ? <SignedIn /> : <SignedOut />}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
