import React from "react";
import { Route } from "react-router";

//JobPosition
import JobPositionList from "../pages/jobPosition/JobPositionList";

//Staff
import StaffUpdate from "../pages/staff/StaffUpdate";
import StaffList from "../pages/staff/StaffList";

//CurriculumVitae
import CurriculumVitaeCreate from "../pages/curriculumVitae/CurriculumVitaeCreate";
import CurriculumVitaeList from "../pages/curriculumVitae/CurriculumVitaeList";
import CurriculumVitaeUpdate from "../pages/curriculumVitae/CurriculumVitaeUpdate";

//Candidate
import CandidateList from "../pages/candidate/CandidateList";

//Employer
import EmployerList from "../pages/employer/EmployerList";
import EmployerDetail from "../pages/employer/EmployerDetail";
import CompanyUpdate from "../pages/employer/CompanyUpdate";
import UpdateCompanyConfirm from "../pages/employer/UpdateCompanyConfirm";

//JobAdvertisement
import FavoriteJobAdvertisementList from "../pages/jobAdvertisement/FavoriteJobAdvertisementList";
import JobFilter from "../pages/jobAdvertisement/JobFilter";
import JobAdvertisementAdd from "../pages/jobAdvertisement/JobAdvertisementAdd";
import JobAdvertisementList from "../pages/jobAdvertisement/JobAdvertisementList";
import JobAdvertConfirm from "../pages/jobAdvertisement/JobAdvertConfirm";

//Register
import CandidateRegister from "../pages/register/CandidateRegister";
import StaffRegister from "../pages/register/StaffRegister";
import EmployerRegister from "../pages/register/EmployerRegister";

//Login
import Login from "../pages/login/Login";
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
      <Route exact path="/jobadvert-confirm" component={JobAdvertConfirm} />
      <Route exact path="/jobadvertlist" component={JobAdvertisementList} />
      <Route
        exact
        path="/favoriteJobs"
        component={FavoriteJobAdvertisementList}
      />
      <Route exact path="/register/candidate" component={CandidateRegister} />
      <Route exact path="/register/staff" component={StaffRegister} />
      <Route exact path="/register/employer" component={EmployerRegister} />

      <Route exact path="/cv-create" component={CurriculumVitaeCreate} />
      <Route exact path="/cv-update" component={CurriculumVitaeUpdate} />
      <Route exact path="/staff/update/:id" component={StaffUpdate} />

      <Route exact path="/company/update" component={CompanyUpdate} />
      <Route exact path="/cv/update" component={CurriculumVitaeUpdate} />
      <Route exact path="/filter" component={JobFilter} />

      <Route
        exact
        path="/company/update-confirm"
        component={UpdateCompanyConfirm}
      />

      <Route exact path="/login" component={Login} />
    </div>
  );
}
