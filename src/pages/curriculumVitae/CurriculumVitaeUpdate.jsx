import { Grid } from "@material-ui/core";
import React from "react";
import CandidateSideMenu from "../candidate/CandidateSideMenu";

export default function CurriculumVitaeUpdate() {
  return (
    <div>
      <Grid
        space={1}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={2}>
          <CandidateSideMenu />
        </Grid>
        <Grid item xs={9}>
          aaaaaaaaa
        </Grid>
      </Grid>
    </div>
  );
}
