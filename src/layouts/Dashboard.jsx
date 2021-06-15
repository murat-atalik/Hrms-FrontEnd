import React from "react";
import JobPositionList from "../pages/JobPositionList";
import CandidateList from "../pages/CandidateList";
import CurriculumVitaeList from "../pages/CurriculumVitaeList";
import EmployerList from "../pages/EmployerList";
import StaffList from "../pages/StaffList";
import { Route } from "react-router";
import SideMenu from "./SideMenu";
import { Grid } from "@material-ui/core";

export default function DashBoard() {
  return (
    <div>
      <Grid
        space={1}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <SideMenu />
        </Grid>
        <Grid item xs={8}>
          <Route exact path="/job" component={JobPositionList} />
          <Route exact path="/candidate" component={CandidateList} />
          <Route exact path="/cv" component={CurriculumVitaeList} />
          <Route exact path="/employer" component={EmployerList} />
          <Route exact path="/staff" component={StaffList} />
        </Grid>
      </Grid>
    </div>
  );
}
