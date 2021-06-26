import React from "react";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";

import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import { Grid, Paper } from "@material-ui/core";
import FormikButton from "../../utilities/customFormComponents/FormikButton";

export default function EmployerRegister() {
  const validationSchema = yup.object({
    companyName: yup.string("Şirket adı").required("Şirket adı gerekli!"),
    webAddress: yup.string("Web adresi").required("Web adresi gerekli!"),
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    password: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    rePassword: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .oneOf([yup.ref("password"), null], "şifreler aynı olmak zorunda"),
    phoneNumber: yup
      .string("Telefon numarası")
      .required("Telefon numarası gerekli!"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      companyName: "",
      webAddress: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
  });
  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    //jobService.add(values).then((result) => console.log(result.data.data));
    //alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
  };

  return (
    <div>
      <Paper
        style={{
          padding: "4em",
          backgroundColor: "#E5E5E5",
        }}
      >
        <Formik
          initialValues={formik.initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormikTextField name="companyName" label="Şirket adı" />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField name="webAddress" label="Web Adresi" />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField name="email" label="Eposta Adresi" />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField name="phoneNumber" label="Telefon Numarası" />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  name="password"
                  type="password"
                  label="Şifre"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  name="rePassword"
                  type="password"
                  label="Şifre tekrarı"
                />
              </Grid>

              <Grid item xs={12}>
                <FormikButton>Kayıt ol</FormikButton>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Paper>
    </div>
  );
}
