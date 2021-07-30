import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import RoleService from "../../services/roleService";

import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";

import { useAlert } from "react-alert";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";

export default function RoleUpdate() {
  const alert = useAlert();
  const roleService = new RoleService();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  useEffect(() => {
    roleService.getRoles().then((result) => setRoles(result.data.data));
  });
  const tRoles = roles.map(({ id, roleName: value }) => ({
    id,
    value,
  }));

  const validationSchema = yup.object({
    id: yup.number("Eski rol").required("Eski rol adı gerekli!"),
    roleName: yup.string("Rol adı").required("Yeni rol adı gerekli!"),
  });

  const handleSelect = (value) => {
    roleService.update(value).then((result) => {
      result.data.success
        ? alert.success("ROL GÜNCELLENDİ")
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
          <Typography component="h1" variant="h5">
            Rol Güncelle
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{ id: selectedRole || "", roleName: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSelect}
          >
            <Form>
              <Grid
                item
                xs={12}
                style={{ marginTop: "1em", marginBottom: "1em" }}
              >
                <FormikSelect name="id" label="Eski Rol Adı" options={tRoles} />
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField name="roleName" label="Yeni Rol Adı" />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikButton> Rolü Güncelle</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
