import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";

import { Grid, Paper } from "@material-ui/core";

import FormikTextField from "../../utilities/customFormComponents/FormikTextField";

import FormikButton from "../../utilities/customFormComponents/FormikButton";

import EmployerService from "../../services/employerService";
import UpdateCompanyService from "../../services/updateCompanyService";
import EmployerSideMenu from "../employer/EmployerSideMenu";

export default function CompanyUpdate() {
  let employerService = new EmployerService();
  let updateCompanyService = new UpdateCompanyService();
  let id = 1;
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
      .getByEmployerId(id)
      .then((result) => setEmployer(result.data.data));
  }, []);

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    updateCompanyService
      .add(values)
      .then((result) => alert(result.data.message));
  };
  return (
    <Grid
      space={1}
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item xs={3}>
        <EmployerSideMenu />
      </Grid>
      <Grid item xs={8}>
        <Paper style={{ backgroundColor: "#E5E5E5", padding: "4em" }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              companyId: employer?.company?.id || "",
              employerId: id || "",
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
