import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Form, useFormik, Formik, FieldArray } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import CurriculumVitaeService from "../../services/curriculumVitaeService";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import CVAbilityUpdate from "./curriculumVitaeUpdate/CVAbilityUpdate";
import { TextField } from "@material-ui/core";
import FormikDAtePicker from "../../utilities/customFormComponents/FormikDatePicker";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";

export default function CurriculumVitaeUpdate() {
  let cvService = new CurriculumVitaeService();
  const [curriculumVitaes, setCurriculumVitaes] = useState([]);
  // useEffect(() => {
  //   cvService
  //     .getById(id)
  //     .then((result) => setCurriculumVitaes(result.data.data));
  // }, []);
  const validationSchema = yup.object({
    candidateId: yup.number().required(),
    firstName: yup.string("Ad").required("Ad gerekli!"),
    lastName: yup.string("Soyad").required("Soyad gerekli!"),
    email: yup
      .string("Email")
      .email("Geçerli bir email adresi değil!")
      .required("Email Gerekli!"),
    coverLetter: yup
      .string("Ön yazı")

      .required("Ö yazı gerekli!"),

    github: yup
      .string("Github hesabınız girin")
      .required("Github hesabınız  gerekli!"),
    linkedin: yup
      .string("LinkednIn hesabınız  girin")
      .required("LinkednIn hesabınız  gerekli!"),
    abilities: yup.array().of(
      yup.object().shape({
        abilityName: yup.string("Yetenek").required("Yetenek gerekli!"),
      })
    ),
    experiences: yup.array().of(
      yup.object().shape({
        businessName: yup.string("Şirket adı").required("Şirket adı gerekli!"),
        position: yup
          .string("Pozisyon bilgisi")
          .required("Pozisyon bilgisi gerekli!"),
        workQuitDate: yup.date("İşten ayrılma tarihi"),
        workStartDate: yup
          .date("İşe başlama tarihi")
          .required("İşe başlama tarihi gerekli!"),
      })
    ),
    languages: yup.array().of(
      yup.object().shape({
        languageDegree: yup
          .number("Dil seviyesi")
          .required("Dil seviyesi gerekli!")
          .min(1, "Minimum değer 1")
          .max(5, "Maximum değer 5"),
        languageName: yup
          .string("Yabancı dil")
          .required("Yabancı dil gerekli!"),
      })
    ),
    //  imageUrl: yup
    //    .string("Şifre ")
    //   .required("Şifre gerekli"),
  });
  const formik = useFormik({
    initialValues: {
      candidateId: 3,
      firstName: "",
      lastName: "",
      email: "",
      coverLetter: "",
      github: "",
      linkedin: "",
      abilities: [{ abilityName: "" }],
      educations: [
        {
          educationStartDate: "",
          graduationDate: "",
          schoolName: "",
        },
      ],
      experiences: [
        {
          businessName: "",
          position: "",
          workQuitDate: "",
          workStartDate: "",
        },
      ],
      languages: [
        {
          languageDegree: "",
          languageName: "",
        },
      ],
      //  imageUrl: yup
      //    .string("Şifre ")
      //   .required("Şifre gerekli"),
      // schoolName: "",
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    cvService.addCv(values).then((result) => alert(result.data.message));
  };

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
            initialValues={formik.initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormikTextField name="firstName" label="Ad" />
                  </Grid>
                  <Grid item xs={6}>
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
                    <FieldArray name="abilities">
                      {({ push, remove }) => (
                        <Paper
                          style={{
                            backgroundColor: "#f5f5f5",
                            padding: "2em",
                            marginTop: "2em",
                          }}
                        >
                          <Grid item>
                            <Typography variant="h5">Yetenekler:</Typography>
                          </Grid>

                          {values.abilities.map((_, index) => (
                            <Grid
                              key={index}
                              container
                              item
                              style={{ marginTop: "1em", marginBottom: "1em" }}
                            >
                              <Grid item xs={11}>
                                <FormikTextField
                                  name={`abilities[${index}].abilityName`}
                                  label="Yetenek"
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <Button onClick={() => remove(index)}>
                                  <AiFillDelete color="black" size="2em" />
                                </Button>
                              </Grid>
                            </Grid>
                          ))}
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => push({ abilityName: "" })}
                          >
                            <AiOutlinePlusCircle color="black" size="2em" />
                            Ekle
                          </Button>
                        </Paper>
                      )}
                    </FieldArray>

                    <FieldArray name="languages">
                      {({ push, remove }) => (
                        <Paper
                          style={{
                            backgroundColor: "#f5f5f5",
                            padding: "2em",
                            marginTop: "2em",
                          }}
                        >
                          <Grid item>
                            <Typography variant="h5">
                              Yabancı Diller:
                            </Typography>
                          </Grid>

                          {values.languages.map((_, index) => (
                            <Grid
                              key={index}
                              container
                              item
                              style={{ marginTop: "1em", marginBottom: "1em" }}
                            >
                              <Grid item xs={5}>
                                <FormikTextField
                                  name={`languages[${index}].languageName`}
                                  label="Yabancı Dil"
                                />
                              </Grid>
                              <Grid item xs={5}>
                                <FormikTextField
                                  name={`languages[${index}].languageDegree`}
                                  label="Dil Seviyesi (1-5)"
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <Button onClick={() => remove(index)}>
                                  <AiFillDelete color="black" size="2em" />
                                </Button>
                              </Grid>
                            </Grid>
                          ))}
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() =>
                              push({ languageDegree: "", languageName: "" })
                            }
                          >
                            <AiOutlinePlusCircle color="black" size="2em" />
                            Ekle
                          </Button>
                        </Paper>
                      )}
                    </FieldArray>
                    <FieldArray name="experiences">
                      {({ push, remove }) => (
                        <Paper
                          style={{
                            backgroundColor: "#f5f5f5",
                            padding: "2em",
                            marginTop: "2em",
                          }}
                        >
                          <Grid
                            item
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                          >
                            <Typography variant="h5">
                              Çalışma Deneyimleri :
                            </Typography>
                          </Grid>

                          {values.experiences.map((_, index) => (
                            <Grid
                              container
                              direction="row"
                              justify="center"
                              alignItems="flex-start"
                              key={index}
                              item
                              style={{ marginTop: "1em", marginBottom: "1em" }}
                            >
                              <Grid
                                item
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                xs={11}
                              >
                                <Grid item xs={6} style={{ marginTop: "1em" }}>
                                  <FormikTextField
                                    name={`experiences[${index}].businessName`}
                                    label="Şirket Adı"
                                  />
                                </Grid>
                                <Grid item xs={6} style={{ marginTop: "1em" }}>
                                  <FormikTextField
                                    name={`experiences[${index}].position`}
                                    label="Pozisyon"
                                  />
                                </Grid>
                                <Grid item xs={6} style={{ marginTop: "1em" }}>
                                  <FormikDAtePicker
                                    name={`experiences[${index}].workStartDate`}
                                    label="İşe Başlangıç tarihi"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  style={{
                                    marginTop: "1em",
                                  }}
                                >
                                  <FormikDAtePicker
                                    name={`experiences[${index}].workQuitDate`}
                                    label="İşten Ayrılma tarihi"
                                  />
                                </Grid>
                                <hr />
                              </Grid>
                              <Grid item xs={1}>
                                <Button
                                  style={{
                                    marginTop: "1em",
                                    marginBottom: "2em",
                                  }}
                                  fullWidth
                                  onClick={() => remove(index)}
                                >
                                  <AiFillDelete color="black" size="2em" />
                                </Button>
                              </Grid>
                            </Grid>
                          ))}
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() =>
                              push({
                                businessName: "",
                                position: "",
                                workQuitDate: "",
                                workStartDate: "",
                              })
                            }
                          >
                            <AiOutlinePlusCircle color="black" size="2em" />
                            Ekle
                          </Button>
                        </Paper>
                      )}
                    </FieldArray>
                    <FieldArray name="educations">
                      {({ push, remove }) => (
                        <Paper
                          style={{
                            backgroundColor: "#f5f5f5",
                            padding: "2em",
                            marginTop: "2em",
                          }}
                        >
                          <Grid
                            item
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                          >
                            <Typography variant="h5">
                              Eğitim Bilgileri:
                            </Typography>
                          </Grid>

                          {values.educations.map((_, index) => (
                            <Grid
                              container
                              direction="row"
                              justify="center"
                              alignItems="flex-start"
                              key={index}
                              item
                              style={{ marginTop: "1em", marginBottom: "1em" }}
                            >
                              <Grid
                                item
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                xs={11}
                              >
                                <Grid item xs={12} style={{ marginTop: "1em" }}>
                                  <FormikTextField
                                    name={`educations[${index}].schoolName`}
                                    label="Okul Adı"
                                  />
                                </Grid>

                                <Grid item xs={6} style={{ marginTop: "1em" }}>
                                  <FormikDAtePicker
                                    name={`educations[${index}].educationStartDate`}
                                    label="Okula Başlangıç Tarihi"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  style={{
                                    marginTop: "1em",
                                  }}
                                >
                                  <FormikDAtePicker
                                    name={`educations[${index}].graduationDate`}
                                    label="Mezuniyet Tarihi"
                                  />
                                </Grid>
                                <hr />
                              </Grid>
                              <Grid item xs={1}>
                                <Button
                                  style={{
                                    marginTop: "1em",
                                    marginBottom: "2em",
                                  }}
                                  fullWidth
                                  onClick={() => remove(index)}
                                >
                                  <AiFillDelete color="black" size="2em" />
                                </Button>
                              </Grid>
                            </Grid>
                          ))}
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() =>
                              push({
                                educationStartDate: "",
                                graduationDate: "",
                                schoolName: "",
                              })
                            }
                          >
                            <AiOutlinePlusCircle color="black" size="2em" />
                            Ekle
                          </Button>
                        </Paper>
                      )}
                    </FieldArray>
                  </Grid>

                  <Grid item xs={12}>
                    <FormikButton>Kaydet</FormikButton>
                  </Grid>
                </Grid>
                <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
