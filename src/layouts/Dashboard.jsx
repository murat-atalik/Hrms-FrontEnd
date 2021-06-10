import React from "react";
import { Grid } from "semantic-ui-react";
import JobPositionList from "../pages/JobPositionList";
import CandidateList from "../pages/CandidateList";
import CurriculumVitaeList from "../pages/CurriculumVitaeList";
import EmployeeList from "../pages/EmployeeList";
import StaffList from "../pages/StaffList";
import { Route } from "react-router";
import SideMenu from "./SideMenu";

export default function DashBoard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <SideMenu />
          </Grid.Column>
          <Grid.Column width={12}>
            <Route exact path="/" component={JobPositionList} />
            <Route exact path="/home" component={JobPositionList} />
            <Route exact path="/job" component={JobPositionList} />
            <Route exact path="/candidate" component={CandidateList} />
            <Route exact path="/cv" component={CurriculumVitaeList} />
            <Route exact path="/employee" component={EmployeeList} />
            <Route exact path="/staff" component={StaffList} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
