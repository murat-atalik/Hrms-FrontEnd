import { Grid, Paper } from "@material-ui/core";
import { Form, useFormik, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import CurriculumVitaeService from "../../services/curriculumVitaeService";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import CVAbilityUpdate from "./curriculumVitaeUpdate/CVAbilityUpdate";

export default function CurriculumVitaeUpdate() {
  let id = 17;
  let cvService = new CurriculumVitaeService();
  const [curriculumVitaes, setCurriculumVitaes] = useState([]);
  useEffect(() => {
    cvService
      .getById(id)
      .then((result) => setCurriculumVitaes(result.data.data));
  }, []);
  const validationSchema = yup.object({
    candidateId: yup.number(),
    coverLetter: yup
      .string("E-posta adresinizi girin")
      .required("E-posta adresi gerekli!"),

    github: yup.string("Adınızı girin").required("Adınız gerekli!"),
    linkedin: yup.string("Soyadınızı girin").required("Sayadınız gerekli!"),

    //TODO:https://formik.org/docs/api/fieldarray
    // imageUrl: yup
    //   .string("Şifre ")
    //   .required("Şifre gerekli"),
    // schoolName: yup.string("Şifre ").required("Şifre gerekli"),

    // educationStartDate: yup
    //   .date("Sistem rolü")
    //   .required("Sistem rolü gerekli!"),
    // graduationDate: yup.date("Sistem rolü").required("Sistem rolü gerekli!"),
    // businessName: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
    // workStartDate: yup.date("Sistem rolü").required("Sistem rolü gerekli!"),
    // workQuitDate: yup.date("Sistem rolü").required("Sistem rolü gerekli!"),
    // languageName: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
    // languageDegree: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
    // ability: yup.string("Sistem rolü").required("Sistem rolü gerekli!"),
  });

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    //cvService.add(values).then((result) => console.log(result.data.data));
    // alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
  };
  console.log(curriculumVitaes);
  return (
    <Grid
      space={1}
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item xs={2}>
        <CandidateSideMenu />
      </Grid>
      <Grid item xs={9}>
        <Paper style={{ backgroundColor: "#E5E5E5", padding: "4em" }}>
          <Formik
            enableReinitialize
            initialValues={{
              id: curriculumVitaes?.id,
              email: curriculumVitaes?.candidate?.email || "",
              firstName: curriculumVitaes?.candidate?.firstName || "",
              lastName: curriculumVitaes?.candidate?.lastName || "",
              github: curriculumVitaes?.github || "",
              linkedin: curriculumVitaes?.linkedin || "",
              coverLetter: curriculumVitaes?.coverLetter || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <FormikTextField name="firstName" label="Ad" />
                </Grid>
                <Grid item xs={5}>
                  <FormikTextField name="lastName" label="Soyad" />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField name="email" label="E-Posta" />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField name="github" label="Github" />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField name="linkedin" label="LinkedIn" />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField name="coverLetter" label="Ön Yazı" />
                </Grid>

                <Grid item xs={12}>
                  <FormikButton>Güncelle</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
          <Paper
            style={{ backgroundColor: "red", padding: "4em", marginTop: "2em" }}
          >
            {curriculumVitaes?.abilities !== undefined ? (
              curriculumVitaes?.abilities.map((ability) => {})
            ) : (
              <div />
            )}
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
}
