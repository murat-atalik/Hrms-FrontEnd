import { Avatar, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideMenuOnlyButton from "../../layouts/SideMenuOnlyButton";
import SideMenu from "../../layouts/SideMenu";
import CurriculumVitaeService from "../../services/curriculumVitaeService";
import { MdBrokenImage } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function CurriculumVitaeDetails() {
  let { id } = useParams();
  const curriculumVitaService = new CurriculumVitaeService();
  const [cv, setCv] = useState({});
  useEffect(() => {
    curriculumVitaService.getById(id).then((result) => {
      setCv(result.data.data);
    });
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    container: {
      minHeight: 600,
      padding: "2em",
      minWidth: 600,
    },
    paper: {
      marginTop: "2em",
      minHeight: 300,
      padding: "4em",
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
  console.log(cv.experiences);
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

      <Grid
        component={Paper}
        style={{ background: "#cfd8dc" }}
        className={classes.paper}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        flex="1"
        item
        xs={10}
        lg={8}
      >
        <Grid
          component={Paper}
          className={classes.paper}
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          flex="1"
          item
          xs={12}
        >
          <Grid item xs={12}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Kişisel Bilgiler:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {cv.imageUrl !== undefined ? (
              <Avatar
                src={cv.imageUrl}
                style={{
                  maxWidth: "10em",
                  maxHeight: "10em",
                  width: "10em",
                  height: "10em",
                }}
              />
            ) : (
              <MdBrokenImage color="black" size="20em" />
            )}
          </Grid>
          <Grid item container xs={6}>
            <Grid item xs={12}>
              <Typography variant="h5" style={{ marginTop: "1em" }}>
                AD: {cv.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" style={{ marginTop: "1em" }}>
                SOYAD: {cv.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" style={{ marginTop: "1em" }}>
                <a
                  href={"mailto:" + cv.email}
                  style={{ textDecoration: "none", color: "#212121" }}
                >
                  EMAİL: {cv.email}
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Ön Yazı:
            </Typography>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              {cv.coverLetter}
            </Typography>
          </Grid>
          <Grid item container direction="row-reverse" xs={12}>
            <Grid item xs={1}>
              <a
                href={"https://" + cv.github}
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <FaGithub color="black" size="3em" />
              </a>
            </Grid>
            <Grid item xs={1}>
              <a
                href={"https://" + cv.linkedin}
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <FaLinkedinIn color="#0e76a8" size="3em" />
              </a>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          component={Paper}
          className={classes.paper}
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          flex="1"
          item
          xs={12}
        >
          <Grid item xs={12} style={{ marginTop: "2em" }}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Eğitim:
            </Typography>
          </Grid>
          {cv.educations !== undefined && cv.educations.length > 0 ? (
            cv.educations.map((education) => {
              return (
                <Grid
                  container
                  item
                  xs={12}
                  key={education.id}
                  style={{ marginTop: "2em" }}
                >
                  <Grid item xs={12} style={{ marginTop: "2em" }}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      Okul Adı: {education.schoolName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: "2em" }}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      Başlangıç Tarihi: {education.startingDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: "2em" }}>
                    {education.graduationDate !== null ? (
                      <Typography variant="h5" style={{ textAlign: "center" }}>
                        Mezuniyet Tarihi: {education.graduationDate}
                      </Typography>
                    ) : (
                      <Typography variant="h5" style={{ textAlign: "center" }}>
                        Hala Devam Etmektedir.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12} style={{ marginTop: "2em" }}>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Eğitim Verisi Mevcut Değil
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid
          component={Paper}
          className={classes.paper}
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          flex="1"
          item
          xs={12}
        >
          <Grid item xs={12} style={{ marginTop: "2em" }}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Yetenekler:
            </Typography>
          </Grid>
          <Grid
            container
            item
            direction="row"
            xs={12}
            style={{ marginTop: "2em" }}
          >
            {cv.abilities !== undefined && cv.abilities.length > 0 ? (
              cv.abilities.map((ability) => {
                return (
                  <Grid item xs={3} key={ability.id}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      {ability.abilityName}
                    </Typography>
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12} style={{ marginTop: "2em" }}>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Yetenek Bilgisi Mevcut Değil
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid
          component={Paper}
          className={classes.paper}
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          flex="1"
          item
          xs={12}
        >
          <Grid item xs={12} style={{ marginTop: "2em" }}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Deneyimler:
            </Typography>
          </Grid>
          {cv.experiences !== undefined && cv.experiences.length > 0 ? (
            cv.experiences.map((experience) => {
              return (
                <Grid
                  container
                  item
                  xs={12}
                  key={experience.id}
                  style={{ marginTop: "2em" }}
                >
                  <Grid item xs={6} style={{ marginTop: "2em" }}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      Şirket Adı: {experience.businessName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: "2em" }}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      Çalıştığı Pozisyon: {experience.position}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: "2em" }}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      Başlangıç Tarihi: {experience.startingDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: "2em" }}>
                    {experience.quitDate !== null ? (
                      <Typography variant="h5" style={{ textAlign: "center" }}>
                        İşten Ayrılma Tarihi: {experience.quitDate}
                      </Typography>
                    ) : (
                      <Typography variant="h5" style={{ textAlign: "center" }}>
                        Hala Çalışmaktadır.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12} style={{ marginTop: "2em" }}>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Çalışma Deneyimi bulunmamaktadır.
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid
          component={Paper}
          className={classes.paper}
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          flex="1"
          item
          xs={12}
        >
          <Grid item xs={12} style={{ marginTop: "2em" }}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Yabancı Diller:
            </Typography>
            <Grid
              container
              item
              direction="row"
              xs={12}
              style={{ marginTop: "2em" }}
            >
              {cv.languages !== undefined && cv.languages.length > 0 ? (
                cv.languages.map((language) => {
                  return (
                    <Grid item xs={3} key={language.id}>
                      <Typography variant="h5" style={{ textAlign: "center" }}>
                        {language.language}
                      </Typography>
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12} style={{ marginTop: "2em" }}>
                  <Typography variant="h5" style={{ textAlign: "center" }}>
                    Yetenek Bilgisi Mevcut Değil
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
