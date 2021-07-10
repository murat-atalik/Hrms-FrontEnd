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
import StaffSideMenuButton from "../staff/StaffSideMenuButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useAlert } from "react-alert";

export default function StaffRegister() {
  const alert = useAlert();
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
    staffService.add(values).then((result) => {
      result.data.success
        ? alert.success("KULLANICI OLUŞTURULDU")
        : alert.error(result.data.message);
    });
  };
  const useStyles = makeStyles((theme) => ({
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
