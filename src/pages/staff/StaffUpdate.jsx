import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles } from "@material-ui/core";
import RoleService from "../../services/roleService";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";
import FormikButton from "../../utilities/customFormComponents/FormikButton";
import StaffService from "../../services/staffService";
import { useParams } from "react-router-dom";
import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";
import { useAlert } from "react-alert";

export default function StaffUpdate() {
  const alert = useAlert();
  let staffService = new StaffService();
  let { id } = useParams();
  const validationSchema = yup.object({
    id: yup.number(),
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    firstName: yup.string("Adınızı girin").required("Adınız gerekli!"),
    lastName: yup.string("Soyadınızı girin").required("Sayadınız gerekli!"),
    roleId: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
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
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    staffService.getById(id).then((result) => setStaff(result.data.data));
  });

  const handleSubmit = (values) => {
    staffService.update(values);
    alert.success("BİLGİLER GÜNCELLENDİ");
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
        <Formik
          enableReinitialize={true}
          initialValues={{
            id: id,
            email: staff?.email || "",
            firstName: staff?.firstName || "",
            lastName: staff?.lastName || "",
            roleId: staff?.role?.id || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormikTextField
                  name="email"
                  type="email"
                  label="E-Posta Adresi"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField name="firstName" label="Ad" />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField name="lastName" label="Soyad" />
              </Grid>

              <Grid item xs={12}>
                <FormikSelect
                  name="roleId"
                  label="Yönetici Rolü"
                  options={tRoles}
                />
              </Grid>
              <Grid item xs={12}>
                <FormikButton>Güncelle</FormikButton>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}
