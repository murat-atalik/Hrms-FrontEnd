import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import CityService from "../../services/cityService";

import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";

import { useAlert } from "react-alert";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";

export default function CityUpdate() {
  const alert = useAlert();
  const cityService = new CityService();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  useEffect(() => {
    cityService.getCities().then((result) => setCities(result.data.data));
  });
  const tCities = cities.map(({ id, cityName: value }) => ({
    id,
    value,
  }));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const validationSchema = yup.object({
    id: yup.number("Şehir").required("Eski şehir adı gerekli!"),
    cityName: yup.string("Şehir adı").required("Yeni şehir adı gerekli!"),
  });

  const handleSelect = (value) => {
    cityService.update(value).then((result) => {
      result.data.success
        ? alert.success("ŞEHİR GÜNCELLENDİ")
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
            Şehri Güncelle
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{ id: selectedCity || "", cityName: "" }}
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
                  label="Eski Şehir Adı"
                  options={tCities}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikTextField name="cityName" label="Yeni Şehir Adı" />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                  <FormikButton> Şehri Güncelle</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
