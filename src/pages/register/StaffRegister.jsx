import React, { useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";

import {
  Grid,
  Typography,
  makeStyles,
  Avatar,
  CssBaseline,
  Paper,
} from "@material-ui/core";
import RoleService from "../../services/roleService";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";
import FormikButton from "../../utilities/customFormComponents/FormikButton";
import StaffService from "../../services/staffService";
import StaffSideMenu from "../staff/StaffSideMenu";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

export default function StaffRegister() {
  let staffService = new StaffService();
  const validationSchema = yup.object({
    email: yup
      .string("Yönetici e-posta adresinizi girin")
      .required("Yönetici e-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    firstName: yup
      .string("Yönetici adını girin")
      .required("Yönetici adı gerekli!"),
    lastName: yup
      .string("Yönetici soyadı girin")
      .required("Yönetici soyadı gerekli!"),

    password: yup
      .string("Şifre ")
      .required("Geçici şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    rePassword: yup
      .string("Şifre ")
      .required("Geçici şifre tekrarı gerekli")
      .oneOf([yup.ref("password"), null], "şifreler aynı olmak zorunda"),
    roleId: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      firstName: "",
      lastName: "",
      roleId: "",
    },
    validationSchema: validationSchema,
  });
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    let roleService = new RoleService();
    roleService.getRoles().then((result) => setRoles(result.data.data));
  }, []);
  const tRoles = roles.map(({ id, roleName: value }) => ({
    id,
    value,
  }));
  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    staffService.add(values).then((result) => console.log(result.data.data));
    //alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "80vh",
    },
    paper: {
      marginTop: theme.spacing(8),
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Grid
      space={1}
      container
      component="main"
      className={classes.root}
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item xs={2}>
        <StaffSideMenu />
      </Grid>
      <Grid item xs={9}>
        <CssBaseline />
        <Grid
          container
          item
          component={Paper}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Yönetici Oluştur
            </Typography>
            <Formik
              initialValues={formik.initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Grid item xs={12} style={{ margin: "1em" }}>
                  <FormikTextField
                    name="email"
                    type="email"
                    label="E-Posta Adresi"
                  />
                </Grid>
                <Grid item xs={12} style={{ margin: "1em" }}>
                  <FormikTextField name="firstName" label="Adı" />
                </Grid>
                <Grid item xs={12} style={{ margin: "1em" }}>
                  <FormikTextField name="lastName" label="Soyadı" />
                </Grid>
                <Grid item xs={12} style={{ margin: "1em" }}>
                  <FormikTextField
                    name="password"
                    type="password"
                    label="Geçici şifre"
                  />
                </Grid>
                <Grid item xs={12} style={{ margin: "1em" }}>
                  <FormikTextField
                    name="rePassword"
                    type="password"
                    label=" Geçici şifre tekrarı"
                  />
                </Grid>
                <Grid item xs={12} style={{ margin: "1em" }}>
                  <FormikSelect
                    name="roleId"
                    label="Yönetici Rolü"
                    options={tRoles}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ margin: "1em", marginBottom: "4em" }}
                >
                  <FormikButton>Yönetici Oluştur</FormikButton>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
