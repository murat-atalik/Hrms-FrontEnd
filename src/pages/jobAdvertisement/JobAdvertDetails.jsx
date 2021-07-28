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
  Typography,
  Button,
  styled,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { CgSearchLoading } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import SideMenu from "../../layouts/SideMenu";
import SideMenuOnlyButton from "../../layouts/SideMenuOnlyButton";
import EmployerService from "../../services/employerService";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import { green } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
export default function JobAdvertDetail() {
  const { authItem } = useSelector((state) => state.auth);

  let { id } = useParams();

  const [jobAdvert, setJobAdvert] = useState({});
  useEffect(() => {
    let jobAdvertService = new JobAdvertisementService();
    jobAdvertService.getById(id).then((result) => {
      setJobAdvert(result.data.data);
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
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));
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
          <SideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <SideMenuOnlyButton />
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
              </Grid>{" "}
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
                {authItem[0].user.userType == "candidate" ? (
                  <ColorButton
                    variant="contained"
                    size="large"
                    onClick={() => {
                      console.log("başvuru yapıldı");
                    }}
                  >
                    Başvur
                  </ColorButton>
                ) : authItem[0].user.userType == "employer" ? (
                  <ColorButton
                    variant="contained"
                    size="large"
                    onClick={() => {
                      console.log("incele yapıldı");
                    }}
                  >
                    İncele
                  </ColorButton>
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
