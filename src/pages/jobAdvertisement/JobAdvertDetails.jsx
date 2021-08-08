import { Grid, Paper, makeStyles, Typography, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideMenu from "../../layouts/SideMenu";
import SideMenuOnlyButton from "../../layouts/SideMenuOnlyButton";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { useSelector } from "react-redux";
import JobAdvertApplyService from "../../services/jobAdvertApplyService";
import { useAlert } from "react-alert";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import CandidateSideMenuButton from "../candidate/CandidateSideMenuButton";
import EmployerSideMenu from "../employer/EmployerSideMenu";
import EmployerSideMenuButton from "../employer/EmployerSideMenuButton";
import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";
export default function JobAdvertDetail() {
  const alert = useAlert();
  const jobAdvertApplyService = new JobAdvertApplyService();
  const { authItem } = useSelector((state) => state.auth);
  let { id } = useParams();
  const values = {
    candidateId: authItem[0].user.id,
    jobAdvertisementId: id,
  };
  const [jobAdvert, setJobAdvert] = useState({});
  const [apply, setApply] = useState(false);
  useEffect(() => {
    let jobAdvertService = new JobAdvertisementService();
    jobAdvertService.getById(id).then((result) => {
      setJobAdvert(result.data.data);
    });
    let jobAdvertApplyService = new JobAdvertApplyService();
    jobAdvertApplyService.checkApply(authItem[0].user.id, id).then((result) => {
      setApply(result.data.data);
    });
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

  const handleApply = () => {
    jobAdvertApplyService.add(values).then((result) => {
      result.data.success
        ? alert.success(result.data.message)
        : alert.error(result.data.message);
    });
  };
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
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h4"
              style={{ marginBottom: "1em" }}
            >
              Şirket Bilgileri
            </Typography>
            <Paper style={{ backgroundColor: "#e3e3e3", padding: "2em" }}>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p> Şirket Adı</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {jobAdvert?.employer?.company?.companyName}</p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p> Websitesi</p>
                </Grid>
                <Grid item xs={5}>
                  <p>
                    <a
                      href={
                        "https://" + jobAdvert?.employer?.company?.webAddress
                      }
                      target={"_blank"}
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {jobAdvert?.employer?.company?.webAddress}
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
                      href={"mailto:" + jobAdvert?.employer?.email}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {jobAdvert?.employer?.email}
                    </a>
                  </p>
                </Grid>
              </Grid>

              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>Telefon Numarası</p>
                </Grid>
                <Grid item xs={5}>
                  <p>{jobAdvert?.employer?.phoneNumber}</p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h4"
              style={{ marginTop: "2em" }}
            >
              İlan Detayları
            </Typography>
            <Paper
              style={{
                backgroundColor: "#e3e3e3",
                padding: "2em",
                marginTop: "3em",
              }}
            >
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>İlan Detayları:</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {jobAdvert?.jobDescription}</p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>Şehir:</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {jobAdvert?.city?.cityName}</p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>Çalışma pozisyonu:</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {jobAdvert?.jobPosition?.positionName}</p>
                </Grid>
              </Grid>{" "}
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>Çalışma Biçimi:</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {jobAdvert?.workType?.workType}</p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>Çalışma Programı:</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {jobAdvert?.workProgram?.programName}</p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>Açık Pozisyon Sayısı:</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {jobAdvert?.openPosition}</p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>Maaş Aralığı:</p>
                </Grid>
                <Grid item xs={5}>
                  <p>
                    {jobAdvert?.minSalary} - {jobAdvert?.maxSalary}
                  </p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>İlan Yayın Tarihi:</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {jobAdvert?.releaseDate}</p>
                </Grid>
              </Grid>
              <Grid space={2} container direction="row" alignItems="flex-start">
                <Grid item xs={5}>
                  <p>Son Başvuru Tarihi:</p>
                </Grid>
                <Grid item xs={5}>
                  <p> {jobAdvert?.applicationDeadline}</p>
                </Grid>
              </Grid>
              <Grid item container xs={12} direction="row-reverse">
                {authItem[0].user.userType === "candidate" && apply ? (
                  <Button
                    variant="contained"
                    size="large"
                    style={{ color: "white", background: "green" }}
                    onClick={handleApply}
                  >
                    Başvur
                  </Button>
                ) : authItem[0].user.userType === "employer" &&
                  authItem[0].user.id === jobAdvert?.employer?.id ? (
                  <Button
                    component={Link}
                    to={`/review-applies/${jobAdvert?.id}`}
                    variant="contained"
                    size="large"
                    style={{ color: "white", background: "green" }}
                  >
                    Başvuruları İncele
                  </Button>
                ) : (
                  <div></div>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
