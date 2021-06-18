import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { MenuItem } from "@material-ui/core";
import RoleService from "../services/roleService";

export default function StaffRegister() {
  const validationSchema = yup.object({
    email: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!"),
    firstName: yup.string("Adınızı girin").required("Adınız gerekli!"),
    lastName: yup.string("Soyadınızı girin").required("Sayadınız gerekli!"),

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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      //jobService.add(values).then((result) => console.log(result.data.data));
      //alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
    },
  });
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    let roleSeervice = new RoleService();
    roleSeervice.getRoles().then((result) => setRoles(result.data.data));
  }, []);
  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
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
            select
            id="roleName"
            name="roleName"
            label="Role"
            value={formik.values.roleName}
            onChange={formik.handleChange}
            error={formik.touched.roleName && Boolean(formik.errors.roleName)}
            helperText={formik.touched.roleName && formik.errors.roleName}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.roleName}>
                {role.roleName}
              </MenuItem>
            ))}
          </TextField>

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
