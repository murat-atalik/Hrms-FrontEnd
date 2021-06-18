import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { MenuItem } from "@material-ui/core";
import { Paper } from "@material-ui/core";

export default function CandidateRegister() {
  const validationSchema = yup.object({
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!"),
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
      .test(
        "rePassword equal password",
        "Girilen şifreler aynı olmak zorunda!",
        (value) => value === formik.values.password
      ),
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      //jobService.add(values).then((result) => console.log(result.data.data));
      //alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
    },
  });

  return (
    <div>
      <Paper
        style={{
          padding: "4em",
          backgroundColor: "#E5E5E5",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            style={{
              marginTop: "1em",
            }}
            id="email"
            name="email"
            label="E-Posta Adresi"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            style={{
              marginTop: "1em",
            }}
            id="firstName"
            name="firstName"
            label="Ad"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            fullWidth
            style={{
              marginTop: "1em",
            }}
            id="lastName"
            name="lastName"
            label="Soyad"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            fullWidth
            style={{
              marginTop: "1em",
            }}
            id="password"
            name="password"
            label="Şifre"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            style={{
              marginTop: "1em",
            }}
            id="rePassword"
            name="rePassword"
            label="Şifre tekrarı"
            type="password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            error={
              formik.touched.rePassword && Boolean(formik.errors.rePassword)
            }
            helperText={formik.touched.rePassword && formik.errors.rePassword}
          />
          <TextField
            fullWidth
            style={{
              marginTop: "1em",
            }}
            id="nationalityId"
            name="nationalityId"
            label="Tc kimlik No"
            type="number"
            value={formik.values.nationalityId}
            onChange={formik.handleChange}
            error={
              formik.touched.nationalityId &&
              Boolean(formik.errors.nationalityId)
            }
            helperText={
              formik.touched.nationalityId && formik.errors.nationalityId
            }
          />
          <TextField
            fullWidth
            style={{
              marginTop: "1em",
              marginBottom: "2em",
            }}
            id="birthday"
            name="birthday"
            label="Doğum tarihi"
            type="date"
            value={formik.values.birthday}
            onChange={formik.handleChange}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Kayıt OL
          </Button>
        </form>
      </Paper>
    </div>
  );
}
