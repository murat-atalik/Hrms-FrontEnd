import React from "react";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";

import {
  Grid,
  Link,
  Typography,
  makeStyles,
  Avatar,
  CssBaseline,
  Box,
  Paper,
} from "@material-ui/core";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import FormikDAtePicker from "../../utilities/customFormComponents/FormikDatePicker";
import FormikButton from "../../utilities/customFormComponents/FormikButton";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { NavLink } from "react-router-dom";
import { useAlert } from "react-alert";
import CandidateService from "../../services/candidateService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.muratatalik.com">
        Murat Atalık
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function CandidateRegister() {
  const alert = useAlert();
  const candidateService = new CandidateService();
  const validationSchema = yup.object({
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    firstName: yup.string("Adınızı girin").required("Adınız gerekli!"),
    lastName: yup.string("Soyadınızı girin").required("Sayadınız gerekli!"),

    nationalityId: yup
      .string("TC Kimlik No girin")
      .required("TC Kimlik No  gerekli!")
      .min(11, "Tc Kimlik No 11 hanelidir")
      .max(11, "Tc Kimlik No 11 hanelidir"),
    password: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    rePassword: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .oneOf([yup.ref("password"), null], "şifreler aynı olmak zorunda"),
    birthday: yup
      .string("Doğum tarihiniz")
      .required("Doğum tarihiniz gerekli!"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      firstName: "",
      lastName: "",
      birthday: "",
      nationalityId: "",
    },
    validationSchema: validationSchema,
  });
  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    candidateService.add(values).then((result) => {
      result.data.success
        ? alert.success("KULLANICI OLUŞTURULDU")
        : alert.error(result.data.message);
    });
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "90vh",
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            İş Arayan Kayıt Formu
          </Typography>
          <Formik
            initialValues={formik.initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={classes.form} noValidate>
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
                  <FormikTextField
                    name="email"
                    type="email"
                    label="E-Posta Adresi"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField
                    name="password"
                    type="password"
                    label="Şifre"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField
                    name="rePassword"
                    type="password"
                    label="Şifre tekrarı"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField
                    name="nationalityId"
                    type="number"
                    label="Tc kimlik No"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikDAtePicker name="birthday" label="Doğum tarihi" />
                </Grid>
              </Grid>
              <FormikButton style={{ marginTop: "1em", marginBottom: "1em" }}>
                Kayıt ol
              </FormikButton>
              <Grid
                item
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
                style={{ marginTop: "1em", marginBottom: "1em" }}
              >
                <Grid item xs>
                  <NavLink
                    to="/register/employer"
                    variant="body2"
                    style={{ color: "blue" }}
                  >
                    İş Veren Kayıt Formu
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink
                    to="/login"
                    variant="body2"
                    style={{ color: "blue" }}
                  >
                    Zaten hesabınız var mı? Oturum aç
                  </NavLink>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
        <Box>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
