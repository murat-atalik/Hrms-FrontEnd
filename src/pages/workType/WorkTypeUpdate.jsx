import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import WorkTypeService from "../../services/workTypeService";

import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";

import { useAlert } from "react-alert";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";

export default function WorkTypeUpdate() {
  const alert = useAlert();
  const workTypeService = new WorkTypeService();
  const [workTypes, setWorkTypes] = useState([]);
  const [selectedWorkType, setSelectedWorkType] = useState();
  useEffect(() => {
    workTypeService
      .getWorkTypes()
      .then((result) => setWorkTypes(result.data.data));
  });
  const tWorkTypes = workTypes.map(({ id, workType: value }) => ({
    id,
    value,
  }));

  const validationSchema = yup.object({
    id: yup
      .number("Eski çalışma biçimi")
      .required("Eski çalışma biçimi gerekli!"),
    workType: yup
      .string("Çalışma biçimi")
      .required("Yeni çalışma biçimi gerekli!"),
  });

  const handleSelect = (value) => {
    console.log(value);
    workTypeService.update(value).then((result) => {
      result.data.success
        ? alert.success("ÇALIŞMA BİÇİMİ GÜNCELLENDİ")
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
            Çalışma Biçimini Güncelle
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{ id: selectedWorkType || "", workType: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSelect}
          >
            <Form>
              <Grid
                item
                xs={12}
                style={{ marginTop: "1em", marginBottom: "1em" }}
              >
                <FormikSelect
                  name="id"
                  label="Eski Çalışma Biçimi"
                  options={tWorkTypes}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField
                    name="workType"
                    label="Yeni Çalışma Biçimi"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikButton>Çalışma Biçimini Güncelle</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
