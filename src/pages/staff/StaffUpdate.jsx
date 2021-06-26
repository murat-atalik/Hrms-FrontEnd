import React, { useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Grid, MenuItem } from "@material-ui/core";
import RoleService from "../../services/roleService";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";
import FormikButton from "../../utilities/customFormComponents/FormikButton";
import StaffService from "../../services/staffService";
import { useParams } from "react-router-dom";

export default function StaffUpdate() {
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

    password: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    rePassword: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .oneOf([yup.ref("password"), null], "şifreler aynı olmak zorunda"),
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
  }, []);

  const formik = useFormik({
    initialValues: {
      id: "",
      email: staff?.email ?? "aaa",
      password: "",
      rePassword: "",
      firstName: "",
      lastName: "",
      roleId: "",
    },
    validationSchema: validationSchema,
    values: staff,
  });

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    staffService
      .update(values)
      .then((result) => console.log(result.data.message));
    //alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
  };
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: id,
          email: staff?.email || "",
          firstName: staff?.firstName || "",
          lastName: staff?.lastName || "",
          password: staff?.password || "",
          rePassword: staff?.password || "",
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
    </div>
  );
}
