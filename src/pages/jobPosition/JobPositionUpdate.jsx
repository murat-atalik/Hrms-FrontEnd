import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import JobPositionService from "../../services/jobPositionService";

import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";

import { useAlert } from "react-alert";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";

export default function JobPositionUpdate() {
  const alert = useAlert();
  const [jobPositions, setJobPositions] = useState([]);
  const [selectedJobPositions, setSelectedJobPositions] = useState();
  useEffect(() => {
    let jobPositionService = new JobPositionService();

    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);
  const tJobPositions = jobPositions.map(({ id, positionName: value }) => ({
    id,
    value,
  }));

  const validationSchema = yup.object({
    id: yup.number("İş pozisyonu").required("Eski İş Pozisyonu gerekli!"),
    positionName: yup
      .string(" İş pozisyon adı")
      .required("Yeni İş Pozisyonu  gerekli!"),
  });

  const handleSelect = (value) => {
    let jobPositionService = new JobPositionService();
    jobPositionService.update(value).then((result) => {
      result.data.success
        ? alert.success("İŞ POZİSYONU GÜNCELLENDİ")
        : alert.error("HATA");
      jobPositionService
        .getJobPositions()
        .then((result) => setJobPositions(result.data.data));
    });
  };

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
          <StaffSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <StaffSideMenuButton />
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
        <Paper style={{ backgroundColor: "#E5E5E5", padding: "4em" }}>
          <Typography component="h1" variant="h5">
            İş Pozisyonu Güncelle
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{ id: selectedJobPositions || "", positionName: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSelect}
          >
            <Form>
              <Grid
                item
                xs={12}
                style={{ marginTop: "1em", marginBottom: "1em" }}
              >
                <FormikSelect
                  name="id"
                  label="Eski İş Pozisyonu Adı"
                  options={tJobPositions}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField
                    name="positionName"
                    label="Yeni İş Pozisyonu Adı"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikButton> İş Pozisyonu Güncelle</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
