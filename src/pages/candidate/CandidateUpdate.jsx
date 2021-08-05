import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import FormikTextField from "../../utilities/customFormComponents/FormikTextField";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import EmployerSideMenu from "../employer/EmployerSideMenu";
import EmployerSideMenuButton from "../employer/EmployerSideMenuButton";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import CandidateService from "../../services/candidateService";
import FormikDAtePicker from "../../utilities/customFormComponents/FormikDatePicker";

export default function CandidateUpdate() {
  const alert = useAlert();
  let candidateService = new CandidateService();

  const { authItem } = useSelector((state) => state.auth);
  const validationSchema = yup.object({
    candidateId: yup.string("Gerekli").required("Gerekli!"),
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    firstName: yup.string("Adınızı girin").required("Adınız gerekli!"),
    lastName: yup.string("Soyadınızı girin").required("Sayadınız gerekli!"),

    birthday: yup
      .string("Doğum tarihiniz")
      .required("Doğum tarihiniz gerekli!"),
    securityAnswer: yup.string("Güvenlik sorusu cevabı"),
  });

  const [candidate, setCandidate] = useState([]);
  useEffect(() => {
    candidateService
      .getById(authItem[0].user.id)
      .then((result) => setCandidate(result.data.data));
  });

  const handleSubmit = (values) => {
    candidateService
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
              candidateId: authItem[0].user.id,
              email: candidate?.email || "",
              firstName: candidate?.firstName || "",
              lastName: candidate?.lastName || "",
              birthday: candidate?.birthday || "",

              securityAnswer: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField name="firstName" label="Ad" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField name="lastName" label="Soyad" />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField name="email" label="Eposta Adresi" />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField
                    name="securityAnswer"
                    label="En sevdiğiniz film"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikDAtePicker name="birthday" label="Doğum tarihi" />
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
