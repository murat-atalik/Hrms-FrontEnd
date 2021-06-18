import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function EmployerRegister() {
  const validationSchema = yup.object({
    companyName: yup.string("Şirket adı").required("Şirket adı gerekli!"),
    webAddress: yup.string("Web adresi").required("Web adresi gerekli!"),
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!"),
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      //jobService.add(values).then((result) => console.log(result.data.data));
      //alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
    },
  });

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="companyName"
            name="companyName"
            label="Şirket adı"
            type="text"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
          <TextField
            fullWidth
            id="webAddress"
            name="webAddress"
            label="Web Adresi"
            type="text"
            value={formik.values.webAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.webAddress && Boolean(formik.errors.webAddress)
            }
            helperText={formik.touched.webAddress && formik.errors.webAddress}
          />
          <TextField
            fullWidth
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
            id="phoneNumber"
            name="phoneNumber"
            label="Telefon Numarası"
            type="text"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
