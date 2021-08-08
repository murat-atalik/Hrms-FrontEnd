import React from "react";

import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";

import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";

import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import SideMenu from "../staff/StaffSideMenuButton";
import EmployerSideMenu from "../employer/EmployerSideMenu";
import EmployerSideMenuButton from "../employer/EmployerSideMenuButton";
import CandidateSideMenuButton from "../candidate/CandidateSideMenuButton";
import SideMenuOnlyButton from "../../layouts/SideMenuOnlyButton";
import UserService from "../../services/userService";
import { useHistory } from "react-router-dom";

export default function ChangePassword() {
  const history = useHistory();
  const alert = useAlert();
  let userService = new UserService();
  const { authItem } = useSelector((state) => state.auth);

  const validationSchema = yup.object({
    oldPassword: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    newPassword: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    reNewPassword: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .oneOf([yup.ref("newPassword"), null], "şifreler aynı olmak zorunda"),
  });
  const formik = useFormik({
    initialValues: {
      userId: authItem[0].user.id,
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
    },
    validationSchema: validationSchema,
  });

  const handleChangePassword = (values) => {
    userService.changePassword(values).then((result) => {
      if (result.data.success) {
        alert.success("ŞİFRE GÜNCELLENDİ");
        history.push("/");
      } else alert.error(result.data.message);
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
          {authItem[0].loggedIn && authItem[0].user.userType === "staff" ? (
            <StaffSideMenu />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "employer" ? (
            <EmployerSideMenu />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "candidate" ? (
            <CandidateSideMenu />
          ) : (
            <SideMenu />
          )}
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          {authItem[0].loggedIn && authItem[0].user.userType === "staff" ? (
            <StaffSideMenuButton />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "employer" ? (
            <EmployerSideMenuButton />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "candidate" ? (
            <CandidateSideMenuButton />
          ) : (
            <SideMenuOnlyButton />
          )}
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
        <Paper style={{ backgroundColor: "#E5E5E5", padding: "4em" }}>
          <Typography component="h1" variant="h5">
            Şifre Değiştir
          </Typography>
          <Formik
            initialValues={formik.initialValues}
            validationSchema={validationSchema}
            onSubmit={handleChangePassword}
          >
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "2em", marginBottom: "1em" }}
                >
                  <FormikTextField
                    name="oldPassword"
                    type="password"
                    label="Eski Şifre"
                    style={{ marginBottom: "1em" }}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "1em" }}>
                  <FormikTextField
                    name="newPassword"
                    type="password"
                    label="Yeni Şifre"
                    style={{ marginBottom: "1em" }}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "1em" }}>
                  <FormikTextField
                    name="reNewPassword"
                    type="password"
                    label="Yeni Şifre Tekrarı"
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "1em" }}>
                  <FormikButton>Şifre Değiştir</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
