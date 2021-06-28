import React, { useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Grid, MenuItem, Paper } from "@material-ui/core";
import RoleService from "../../services/roleService";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";
import FormikButton from "../../utilities/customFormComponents/FormikButton";
import StaffService from "../../services/staffService";
import { useParams } from "react-router-dom";
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
    companyName: yup.string("Şirket Adı").required("Şirket Adı Gerekli!"),
    webAddress: yup
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
  console.log(employer.company);

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    updateCompanyService
      .add(values)
      .then((result) => console.log(result.data.message));
    alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
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
              companyName: employer?.company?.companyName || "",
              webAddress: employer?.company?.webAddress || "",
              waitingUpdate: true,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormikTextField
                    name="companyName"
                    type="email"
                    label="Şirket Adı"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField name="webAddress" label="Web Adresi" />
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
