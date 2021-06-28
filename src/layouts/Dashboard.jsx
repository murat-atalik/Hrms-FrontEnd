import React from "react";
import { Route } from "react-router";
import { Grid } from "@material-ui/core";
import SideMenu from "./SideMenu";

import JobPositionList from "../pages/JobPositionList";
import CandidateList from "../pages/candidate/CandidateList";
import CurriculumVitaeList from "../pages/curriculumVitae/CurriculumVitaeList";

import StaffList from "../pages/staff/StaffList";

import JobAdvertisementAdd from "../pages/jobAdvertisement/JobAdvertisementAdd";
import JobAdvertisementList from "../pages/jobAdvertisement/JobAdvertisementList";

import EmployerList from "../pages/employer/EmployerList";
import EmployerDetail from "../pages/employer/EmployerDetail";

import CandidateRegister from "../pages/register/CandidateRegister";
import StaffRegister from "../pages/register/StaffRegister";
import EmployerRegister from "../pages/register/EmployerRegister";
import CurriculumVitaeCreate from "../pages/curriculumVitae/CurriculumVitaeCreate";
import StaffUpdate from "../pages/staff/StaffUpdate";
import FavoriteJobAdvertisementList from "../pages/jobAdvertisement/FavoriteJobAdvertisementList";
import CurriculumVitaeUpdate from "../pages/curriculumVitae/CurriculumVitaeUpdate";
import CompanyUpdate from "../pages/employer/CompanyUpdate";

export default function DashBoard() {
  return (
    <div>
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
        path="/favoriteJobs"
        component={FavoriteJobAdvertisementList}
      />
      <Route exact path="/candidateregister" component={CandidateRegister} />
      <Route exact path="/staff/register" component={StaffRegister} />
      <Route exact path="/register/employer" component={EmployerRegister} />

      <Route exact path="/cv-create" component={CurriculumVitaeCreate} />
      <Route exact path="/cv-update" component={CurriculumVitaeUpdate} />
      <Route exact path="/staff/update/:id" component={StaffUpdate} />

      <Route exact path="/updateCompany" component={CompanyUpdate} />
    </div>
  );
}
