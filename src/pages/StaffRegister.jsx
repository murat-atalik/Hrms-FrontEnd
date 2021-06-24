import React, { useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Grid, MenuItem } from "@material-ui/core";
import RoleService from "../services/roleService";
import FormikTextField from "../utilities/customFormComponents/FormikTextField";
import FormikSelect from "../utilities/customFormComponents/FormikSelect";
import FormikButton from "../utilities/customFormComponents/FormikButton";

export default function StaffRegister() {
  const validationSchema = yup.object({
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!")
      .email("Geçersiz e-posta"),
    firstName: yup.string("Adınızı girin").required("Adınız gerekli!"),
    lastName: yup.string("Soyadınızı girin").required("Sayadınız gerekli!"),

    password: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    rePassword: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .oneOf([yup.ref("password"), null], "şifreler aynı olmak zorunda"),
    roleName: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      firstName: "",
      lastName: "",
      roleName: "",
    },
    validationSchema: validationSchema,
  });
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    let roleSeervice = new RoleService();
    roleSeervice.getRoles().then((result) => setRoles(result.data.data));
  }, []);
  const tRoles = roles.map(({ id, roleName: value }) => ({
    id,
    value,
  }));
  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    //jobService.add(values).then((result) => console.log(result.data.data));
    //alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
  };

  return (
    <div>
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
              <FormikTextField name="password" type="password" label="Şifre" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                name="rePassword"
                type="password"
                label="Şifre tekrarı"
              />
            </Grid>
            <Grid item xs={12}>
              <FormikSelect
                name="roleName"
                label="Yönetici Rolü"
                options={tRoles}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikButton>Kayıt ol</FormikButton>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
}
