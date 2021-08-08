import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import WorkProgramService from "../../services/workProgramService";

import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";

import { useAlert } from "react-alert";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";

export default function WorkProgramUpdate() {
  const alert = useAlert();
  const workProgramService = new WorkProgramService();
  const [workPrograms, setWorkPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState();
  useEffect(() => {
    workProgramService
      .getWorkPrograms()
      .then((result) => setWorkPrograms(result.data.data));
  }, []);
  const tWorkPrograms = workPrograms.map(({ id, programName: value }) => ({
    id,
    value,
  }));

  const validationSchema = yup.object({
    id: yup.number("Eski program").required("Eski iş programı gerekli!"),
    programName: yup
      .string("Program adı")
      .required("Yeni iş programı  gerekli!"),
  });

  const handleSelect = (value) => {
    console.log(value);
    workProgramService.update(value).then((result) => {
      result.data.success
        ? alert.success("İŞ PROGRAMI GÜNCELLENDİ")
        : alert.error("HATA");
      workProgramService
        .getWorkPrograms()
        .then((result) => setWorkPrograms(result.data.data));
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
            İş Programını Güncelle
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{ id: selectedProgram || "", programName: "" }}
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
                  label="Eski İş Programı Adı"
                  options={tWorkPrograms}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField
                    name="programName"
                    label="Yeni İş Programı Adı"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikButton> İş Programını Güncelle</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
