import {
  Grid,
  Table,
  TableCell,
  Paper,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  makeStyles,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { CgSearchLoading } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SideMenu from "../../layouts/SideMenu";
import SideMenuOnlyButton from "../../layouts/SideMenuOnlyButton";
import EmployerService from "../../services/employerService";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import CandidateSideMenuButton from "../candidate/CandidateSideMenuButton";
import EmployerSideMenu from "../employer/EmployerSideMenu";
import EmployerSideMenuButton from "../employer/EmployerSideMenuButton";
import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";

export default function EmployerDetail() {
  const { authItem } = useSelector((state) => state.auth);

  let { id } = useParams();
  const [employer, setEmployer] = useState({});
  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getByEmployerId(id)
      .then((result) => setEmployer(result.data.data));
  }, []);
  const [jobAdverts, setJobAdverts] = useState({});
  useEffect(() => {
    let jobAdvertService = new JobAdvertisementService();
    jobAdvertService
      .getByEmployerIdActive(id)
      .then((result) => setJobAdverts(result.data.data));
  }, []);

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
          {authItem[0].loggedIn && authItem[0].user.userType === "staff" ? (
            <StaffSideMenu />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "employer" ? (
            <EmployerSideMenu />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "candidate" ? (
            <CandidateSideMenu />
          ) : (
            <SideMenu />
          )}
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          {authItem[0].loggedIn && authItem[0].user.userType === "staff" ? (
            <StaffSideMenuButton />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "employer" ? (
            <EmployerSideMenuButton />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "candidate" ? (
            <CandidateSideMenuButton />
          ) : (
            <SideMenuOnlyButton />
          )}
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
        <Grid
          space={2}
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={5}>
            <Paper style={{ backgroundColor: "#e3e3e3", padding: "2em" }}>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p> Şirket Adı</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {employer.company?.companyName}</p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p> Websitesi</p>
                </Grid>
                <Grid item xs={5}>
                  <p>
                    <a
                      href={"https://" + employer.company?.webAddress}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {employer.company?.webAddress}
                    </a>
                  </p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p> E-Posta adresi</p>
                </Grid>
                <Grid item xs={5}>
                  <p>
                    <a
                      href={"mailto:" + employer.email}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {employer.email}
                    </a>
                  </p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>Telefon Numarası</p>
                </Grid>
                <Grid item xs={5}>
                  <p>{employer.phoneNumber}</p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            {employer?.company?.waitingUpdate ? (
              <Paper
                style={{
                  backgroundColor: "#ff6961",
                  padding: "2em",
                }}
              >
                Güncelleme İçin Onay Bekleniyor
              </Paper>
            ) : (
              <Paper
                style={{
                  backgroundColor: "#ACD1AF",
                  padding: "2em",
                }}
              >
                Şirket Bilgileri Güncel
              </Paper>
            )}
          </Grid>
          <Grid item xs={12}>
            {jobAdverts.length > 0 ? (
              <Paper
                style={{
                  backgroundColor: "#e3e3e3",
                  padding: "2em",
                  marginTop: "3em",
                }}
              >
                <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ backgroundColor: "#e3e3e3", padding: "2em" }}
                        >
                          Şehir
                        </TableCell>
                        <TableCell
                          style={{ backgroundColor: "#e3e3e3", padding: "2em" }}
                        >
                          Pozisyon
                        </TableCell>
                        <TableCell
                          style={{ backgroundColor: "#e3e3e3", padding: "2em" }}
                        >
                          Maaş
                        </TableCell>
                        <TableCell
                          style={{ backgroundColor: "#e3e3e3", padding: "2em" }}
                        >
                          Açık Pozisyon
                        </TableCell>
                        <TableCell
                          style={{ backgroundColor: "#e3e3e3", padding: "2em" }}
                        >
                          son Başvuru
                        </TableCell>
                        <TableCell
                          style={{ backgroundColor: "#e3e3e3", padding: "2em" }}
                        >
                          incele
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {jobAdverts?.map((jobAdvert) => {
                        return (
                          <TableRow hover key={jobAdvert.id}>
                            <TableCell>{jobAdvert?.city?.cityName}</TableCell>
                            <TableCell>
                              {jobAdvert?.jobPosition?.positionName}
                            </TableCell>
                            <TableCell>
                              {jobAdvert?.minSalary +
                                "-" +
                                jobAdvert?.maxSalary}
                            </TableCell>
                            <TableCell>{jobAdvert?.openPosition}</TableCell>
                            <TableCell>
                              {jobAdvert?.applicationDeadline}
                            </TableCell>
                            <TableCell>
                              <Link to={`/jobadvert-details/${jobAdvert.id}`}>
                                <CgSearchLoading color="black" size="2em" />
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            ) : (
              <Paper
                style={{
                  backgroundColor: "#e3e3e3",
                  padding: "2em",
                  marginTop: "4em",
                }}
              >
                <h1>Bu şirketin aktif ilanı bulunmamaktadır</h1>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
