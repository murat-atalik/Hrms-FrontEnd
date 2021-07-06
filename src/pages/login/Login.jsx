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
import { NavLink } from "react-router-dom";

import FormikTextField from "../../utilities/customFormComponents/FormikTextField";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
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
export default function Login() {
  const validationSchema = yup.object({
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    password: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
  });
  const handleLogin = (values) => {
    alert(JSON.stringify(values, null, 2));
    //jobService.add(values).then((result) => console.log(result.data.data));
    //alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
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
            Giriş yap
          </Typography>
          <Formik
            initialValues={formik.initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form className={classes.form} noValidate>
              <FormikTextField
                name="email"
                type="email"
                label="E-Posta Adresi"
                style={{ marginTop: "1em", marginBottom: "1em" }}
              />
              <FormikTextField
                name="password"
                type="password"
                label="Şifre"
                style={{ marginTop: "1em", marginBottom: "1em" }}
              />

              <FormikButton style={{ marginTop: "1em", marginBottom: "1em" }}>
                Giriş Yap
              </FormikButton>
              <Grid container style={{ marginTop: "1em", marginBottom: "1em" }}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Şifremi Unuttum
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink
                    to="/register/candidate"
                    variant="body2"
                    style={{ color: "blue" }}
                  >
                    {"Hesabınız yok mu? Kaydol"}
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
