import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";
export default function JobAdvertConfirm() {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    container: {
      minHeight: 600,
    },
    sideMenu: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        display: "none",
      },
      [theme.breakpoints.up("lg")]: {
        display: "block",
      },
    },
    sideMenuOnlyButton: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        display: "block",
      },
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Grid
      space={2}
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <div className={classes.sideMenu}>
        <Grid item lg={2}>
          <StaffSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <StaffSideMenuButton />
        </Grid>
      </div>
      <Grid item xs={10} lg={8}></Grid>
    </Grid>
  );
}
