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

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const history = useHistory();
  function handleSignOut() {
    setIsAuthenticated(false);
    history.push("/");
  }
  function handleSignIn() {
    setIsAuthenticated(true);
  }
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
            {isAuthenticated ? (
              <SignedIn signOut={handleSignOut} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
