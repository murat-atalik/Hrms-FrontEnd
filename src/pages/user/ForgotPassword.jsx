import React from "react";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
import { NavLink, useHistory } from "react-router-dom";

import FormikTextField from "../../utilities/customFormComponents/FormikTextField";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import UserService from "../../services/userService";
import { useAlert } from "react-alert";

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
export default function ForgotPassword() {
  const history = useHistory();
  const alert = useAlert();
  const userService = new UserService();
  const validationSchema = yup.object({
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    password: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    rePassword: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .oneOf([yup.ref("password"), null], "şifreler aynı olmak zorunda"),
    securityAnswer: yup
      .string("Güvenlik sorusu cevabı")
      .required("Güvenlik sorusu cevabı gerekli!"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      securityAnswer: "",
    },
    validationSchema: validationSchema,
  });
  const handleForgotPassword = (values) => {
    userService.forgotPassword(values).then((result) => {
      if (result.data.success) {
        alert.success("ŞİFRE BAŞARIYLA DEĞİŞTİRİLDİ");
        history.push("/");
      } else {
        alert.error("EMAİL VEYA GÜVENLİK SORUSU CEVABI HATALI");
      }
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
            Şifremi Unuttum
          </Typography>
          <Formik
            initialValues={formik.initialValues}
            validationSchema={validationSchema}
            onSubmit={handleForgotPassword}
          >
            <Form className={classes.form} noValidate>
              <FormikTextField
                name="email"
                type="email"
                label="E-Posta Adresi"
                style={{ marginTop: "1em", marginBottom: "1em" }}
              />
              <FormikTextField
                name="securityAnswer"
                label="Güvenlik Sorusu Cevabı"
                style={{ marginTop: "1em", marginBottom: "1em" }}
              />
              <FormikTextField
                name="password"
                type="password"
                label="Şifre"
                style={{ marginTop: "1em", marginBottom: "1em" }}
              />
              <FormikTextField
                name="rePassword"
                type="password"
                label="Şifre Tekrarı"
                style={{ marginTop: "1em", marginBottom: "1em" }}
              />
              <FormikButton style={{ marginTop: "1em", marginBottom: "1em" }}>
                ŞİFREYİ DEĞİŞTİR
              </FormikButton>
              <Grid container style={{ marginTop: "1em", marginBottom: "1em" }}>
                <Grid item xs>
                  <NavLink
                    to="/login"
                    variant="body2"
                    style={{ color: "blue" }}
                  >
                    {"Giriş yap"}
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink
                    to="/register/candidate"
                    variant="body2"
                    style={{ color: "blue" }}
                  >
                    {"Hesabınız yok mu? Kayıt Ol"}
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
