import { Grid } from "@material-ui/core";
import React from "react";
import StaffSideMenu from "../staff/StaffSideMenu";

export default function JobAdvertConfirm() {
  return (
    <Grid container>
      <Grid item xs={2}>
        <StaffSideMenu />
      </Grid>
      <Grid item xs={10}></Grid>
    </Grid>
  );
}
