import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, makeStyles, Paper } from "@material-ui/core";

import FormikTextField from "../../utilities/customFormComponents/FormikTextField";

import FormikButton from "../../utilities/customFormComponents/FormikButton";

import EmployerService from "../../services/employerService";
import UpdateCompanyService from "../../services/updateCompanyService";
import EmployerSideMenu from "../employer/EmployerSideMenu";
import EmployerSideMenuButton from "../employer/EmployerSideMenuButton";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CompanyUpdate() {
  const alert = useAlert();
  let employerService = new EmployerService();
  let updateCompanyService = new UpdateCompanyService();
  const { authItem } = useSelector((state) => state.auth);
  const validationSchema = yup.object({
    companyId: yup.number(),
    employerId: yup.number(),
    newCompanyName: yup.string("Şirket Adı").required("Şirket Adı Gerekli!"),
    newWebAddress: yup
      .string("Şirket Web Adresi")
      .required("Şirket Web Adresi Gerekli!"),
    oldCompanyName: yup.string("Şirket Adı").required("Şirket Adı Gerekli!"),
    oldWebAddress: yup
      .string("Şirket Web Adresi")
      .required("Şirket Web Adresi Gerekli!"),
    waitingUpdate: yup.boolean(),
  });

  const [employer, setEmployer] = useState([]);
  useEffect(() => {
    employerService
      .getByEmployerId(authItem[0].user.id)
      .then((result) => setEmployer(result.data.data));
  });
  const history = useHistory();
  const handleSubmit = (values) => {
    updateCompanyService.add(values).then(() => history.push("/"));
    alert.info("ŞİRKET BİLGİLERİ GÜNCELLENDİ ONAYLANMASINI BEKLEYİN");
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
          <EmployerSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <EmployerSideMenuButton />
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
        <Paper style={{ backgroundColor: "#E5E5E5", padding: "4em" }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              companyId: employer?.company?.id || "",
              employerId: authItem[0].user.id || "",
              newCompanyName: employer?.company?.companyName || "",
              oldCompanyName: employer?.company?.companyName || "",
              newWebAddress: employer?.company?.webAddress || "",
              oldWebAddress: employer?.company?.webAddress || "",
              waitingUpdate: true,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormikTextField name="newCompanyName" label="Şirket Adı" />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField name="newWebAddress" label="Web Adresi" />
                </Grid>

                <Grid item xs={12}>
                  <FormikButton>Güncelle</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
