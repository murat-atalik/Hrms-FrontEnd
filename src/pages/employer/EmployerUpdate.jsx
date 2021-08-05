import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import FormikTextField from "../../utilities/customFormComponents/FormikTextField";

import FormikButton from "../../utilities/customFormComponents/FormikButton";

import EmployerService from "../../services/employerService";
import EmployerSideMenu from "../employer/EmployerSideMenu";
import EmployerSideMenuButton from "../employer/EmployerSideMenuButton";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";

export default function EmployerUpdate() {
  const alert = useAlert();
  let employerService = new EmployerService();

  const { authItem } = useSelector((state) => state.auth);
  const validationSchema = yup.object({
    employerId: yup.string("Gerekli").required("Gerekli!"),
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    phoneNumber: yup
      .string("Telefon numarası")
      .required("Telefon numarası gerekli!"),
    securityAnswer: yup.string("Güvenlik sorusu cevabı"),
  });

  const [employer, setEmployer] = useState([]);
  useEffect(() => {
    employerService
      .getByEmployerId(authItem[0].user.id)
      .then((result) => setEmployer(result.data.data));
  });

  const handleSubmit = (values) => {
    employerService
      .update(values)
      .then((result) =>
        result.data.success
          ? alert.success("GÜNCELLEME BAŞARILI")
          : alert.error("GÜNCELLEME HATALI")
      );
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
          <EmployerSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <EmployerSideMenuButton />
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
        <Paper style={{ backgroundColor: "#E5E5E5", padding: "4em" }}>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "2em" }}
          >
            Bilgileri Güncelle
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{
              employerId: authItem[0].user.id || "",
              email: employer?.email || "",
              phoneNumber: employer?.phoneNumber || "",
              securityAnswer: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormikTextField name="email" label="Eposta Adresi" />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    name="phoneNumber"
                    label="Telefon Numarası"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    name="securityAnswer"
                    label="En sevdiğiniz film"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormikButton>Güncelle</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
