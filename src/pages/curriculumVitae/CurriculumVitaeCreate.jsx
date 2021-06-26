import { Grid } from "@material-ui/core";
import { Form, useFormik, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import CurriculumVitaeService from "../../services/curriculumVitaeService";

export default function CurriculumVitaeCreate() {
  let cvService = new CurriculumVitaeService();
  const validationSchema = yup.object({
    candidateId: yup.number(),
    coverLetter: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!"),

    github: yup.string("Adınızı girin").required("Adınız gerekli!"),
    linkedin: yup.string("Soyadınızı girin").required("Sayadınız gerekli!"),

    imageUrl: yup
      .string("Şifre ")
      .required("Şifre gerekli")
      .min(8, "Şifre en az 8 karakter olmalı"),
    schoolName: yup.string("Şifre ").required("Şifre gerekli"),

    educationStartDate: yup
      .string("Sistem rolü")
      .required("Sistem rolü gerekli!"),
    graduationDate: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
    businessName: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
    workStartDate: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
    workQuitDate: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
    languageName: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
    languageDegree: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
    ability: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
  });
  const formik = useFormik({
    initialValues: {
      candidateId: 1,
      coverLetter: "",
      github: "",
      linkedin: "",
      imageUrl: "",
      schoolName: "",
      educationStartDate: "",
      graduationDate: "",
      businessName: "",
      workStartDate: "",
      workQuitDate: "",
      languageName: "",
      languageDegree: "",
      ability: "",
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    //cvService.add(values).then((result) => console.log(result.data.data));
    alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
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
              <FormikTextField name="coverLetter" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="github" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="linkedin" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="imageUrl" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="schoolName" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="educationStartDate" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="graduationDate" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="businessName" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="workStartDate" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="workQuitDate" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="languageName" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="languageDegree" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField name="ability" label="Soyad" />
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
