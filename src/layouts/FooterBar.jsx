import React from "react";
import {
  Container,
  makeStyles,
  Typography,
  Link,
  CssBaseline,
} from "@material-ui/core";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="initial"
      style={{ color: "white " }}
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.muratatalik.com">
        Murat Atalık
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function FooterBar() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",

      backgroundColor: "#eceff1",
      zIndex: 1301,
    },

    footer: {
      padding: "1.5em",

      backgroundColor: "#263238",
      zIndex: 1301,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
