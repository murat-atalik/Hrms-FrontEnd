import React from "react";
import JobPositionList from "../pages/JobPositionList";
import CandidateList from "../pages/CandidateList";
import CurriculumVitaeList from "../pages/CurriculumVitaeList";
import EmployerList from "../pages/EmployerList";
import StaffList from "../pages/StaffList";
import { Route } from "react-router";
import SideMenu from "./SideMenu";
import { Grid } from "@material-ui/core";
import JobAdvertisementAdd from "../pages/JobAdvertisementAdd";
import JobAdvertisementList from "../pages/JobAdvertisementList";
import CandidateRegister from "../pages/CandidateRegister";
import StaffRegister from "../pages/StaffRegister";
import EmployerRegister from "../pages/EmployerRegister";
import EmployerDetail from "../pages/EmployerDetail";

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
        <Grid item xs={2}>
          <SideMenu />
        </Grid>
        <Grid item xs={9}>
          <Route exact path="/job" component={JobPositionList} />
          <Route exact path="/candidate" component={CandidateList} />
          <Route exact path="/cv" component={CurriculumVitaeList} />
          <Route exact path="/employers" component={EmployerList} />
          <Route path="/employers/:id" component={EmployerDetail} />
          <Route exact path="/staff" component={StaffList} />
          <Route exact path="/jobadvertadd" component={JobAdvertisementAdd} />
          <Route exact path="/jobadvertlist" component={JobAdvertisementList} />
          <Route
            exact
            path="/candidateregister"
            component={CandidateRegister}
          />
          <Route exact path="/staffregister" component={StaffRegister} />
          <Route exact path="/employerregister" component={EmployerRegister} />
        </Grid>
      </Grid>
    </div>
  );
}
