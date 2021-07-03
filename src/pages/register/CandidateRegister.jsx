import React from "react";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";

import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import FormikDAtePicker from "../../utilities/customFormComponents/FormikDatePicker";
import FormikButton from "../../utilities/customFormComponents/FormikButton";

export default function CandidateRegister() {
  const validationSchema = yup.object({
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    firstName: yup.string("Adınızı girin").required("Adınız gerekli!"),
    lastName: yup.string("Soyadınızı girin").required("Sayadınız gerekli!"),

    nationalityId: yup
      .string("TC Kimlik No girin")
      .required("TC Kimlik No  gerekli!")
      .min(11, "Tc Kimlik No 11 hanelidir")
      .max(11, "Tc Kimlik No 11 hanelidir"),
    password: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    rePassword: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .oneOf([yup.ref("password"), null], "şifreler aynı olmak zorunda"),
    birthday: yup
      .string("Doğum tarihiniz")
      .required("Doğum tarihiniz gerekli!"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      firstName: "",
      lastName: "",
      birthday: "",
      nationalityId: "",
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
                <FormikTextField
                  name="nationalityId"
                  type="number"
                  label="Tc kimlik No"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikDAtePicker name="birthday" label="Doğum tarihi" />
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
