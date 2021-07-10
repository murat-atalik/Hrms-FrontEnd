import React, { useEffect, useState } from "react";

import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import JobPositionService from "../../services/jobPositionService";

import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";

import { useAlert } from "react-alert";

export default function JobAdvertisementAdd() {
  const alert = useAlert();
  let jobPositionsService = new JobPositionService();

  const validationSchema = yup.object({
    jobPositionName: yup
      .string("İş Pozisyonu")
      .required("İş pozisyonu gerekli!"),
  });
  const formik = useFormik({
    initialValues: {
      jobPositionName: "",
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = (values) => {
    jobPositionsService.add(values).then((result) => {
      result.data.success
        ? alert.success("İŞ POZİSYONU EKLENDİ")
        : alert.error("HATA");
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
          {" "}
          <Typography component="h1" variant="h5">
            Program Oluştur
          </Typography>
          <Typography component="h1" variant="h5">
            İş Pozisyonu Oluştur
          </Typography>
          <Formik
            initialValues={formik.initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "2em", marginBottom: "1em" }}
                >
                  <FormikTextField
                    name="jobPositionName"
                    label="İş Pozisyonu"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikButton> İş Pozisyonu Oluştur</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
