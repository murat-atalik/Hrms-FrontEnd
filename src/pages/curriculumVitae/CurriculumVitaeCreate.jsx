import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Image from "material-ui-image";
import { Form, useFormik, Formik, FieldArray } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import CurriculumVitaeService from "../../services/curriculumVitaeService";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import CandidateSideMenuButton from "../candidate/CandidateSideMenuButton";
import FormikDAtePicker from "../../utilities/customFormComponents/FormikDatePicker";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";

import "react-dropzone-uploader/dist/styles.css";
import { DropzoneArea } from "material-ui-dropzone";
import { IoIosRemoveCircle } from "react-icons/io";

export default function CurriculumVitaeUpdate() {
  let id = 0;
  let cvService = new CurriculumVitaeService();
  const [imageUrl, setImageUrl] = useState();
  let file = new FormData();
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

      .required("Ön yazı gerekli!"),

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
        quitDate: yup.date("İşten ayrılma tarihi"),
        startingDate: yup
          .date("İşe başlama tarihi")
          .required("İşe başlama tarihi gerekli!"),
      })
    ),
    educations: yup.array().of(
      yup.object().shape({
        id: yup.number(),
        schoolName: yup.string("Okul adı").required("Okul adıgerekli!"),
        startingDate: yup
          .date("Eğitim başlangıç tarihi")
          .required("Eğitim başlangıç tarihi gerekli!"),
        graduationDate: yup.date("Mezuniyet tarihi."),
      })
    ),

    languages: yup.array().of(
      yup.object().shape({
        degree: yup
          .number("Dil seviyesi")
          .required("Dil seviyesi gerekli!")
          .min(1, "Minimum değer 1")
          .max(5, "Maximum değer 5"),
        language: yup.string("Yabancı dil").required("Yabancı dil gerekli!"),
      })
    ),
    imageUrl: yup.string("Fotoğraf"),
  });
  const cvAdd = useFormik({
    initialValues: {
      candidateId: id,
      firstName: "",
      lastName: "",
      email: "",
      coverLetter: "",
      github: "",
      linkedin: "",
      abilities: [{ abilityName: "" }],
      educations: [
        {
          startingDate: "",
          graduationDate: "",
          schoolName: "",
        },
      ],
      experiences: [
        {
          businessName: "",
          position: "",
          quitDate: "",
          startingDate: "",
        },
      ],
      languages: [
        {
          degree: "",
          language: "",
        },
      ],
      imageUrl: imageUrl || "",
    },
    validationSchema: validationSchema,
  });

  const handleCvAdd = (values) => {
    cvService.addCv(values);
  };

  const upload = (data) => {
    file.append("file", data[0]);
    cvService.addImage(file).then((result) => setImageUrl(result.data.data));
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    container: {
      minHeight: 600,
    },
    sideMenu: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        display: "none",
      },
      [theme.breakpoints.up("lg")]: {
        display: "block",
      },
    },
    sideMenuOnlyButton: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        display: "block",
      },
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
  }));
  const classes = useStyles();

  return (
    <Grid
      space={2}
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <div className={classes.sideMenu}>
        <Grid item lg={2}>
          <CandidateSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <CandidateSideMenuButton />
        </Grid>
      </div>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
        item
        xs={10}
        lg={8}
      >
        <Grid item>
          <Typography variant="h5">Özgeçmiş Oluşturma:</Typography>
        </Grid>
        <Paper style={{ backgroundColor: "#E5E5E5", padding: "4em" }}>
          <Formik
            enableReinitialize={true}
            initialValues={cvAdd.initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCvAdd}
          >
            {({ values, errors }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        backgroundColor: "#f5f5f5",
                        padding: "2em",
                        marginTop: "2em",
                      }}
                    >
                      <Grid
                        item
                        style={{
                          backgroundColor: "#f5f5f5",
                          marginBottom: "2em",
                        }}
                      >
                        <Typography variant="h5">Kişisel bilgiler:</Typography>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        item
                        xs={12}
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                      >
                        <Grid item xs={3}>
                          {imageUrl === "" || imageUrl === undefined ? (
                            <DropzoneArea
                              fullWidth="false"
                              acceptedFiles={["image/*"]}
                              showPreviewsInDropzone={false}
                              filesLimit={1}
                              onDelete={() => setImageUrl(null)}
                              dropzoneText={"Fotoğraf sürükle veya seç"}
                              onChange={(files) =>
                                files.length > 0 ? upload(files) : null
                              }
                            />
                          ) : (
                            <Grid
                              container
                              item
                              xs={8}
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                            >
                              <Grid item xs={11}>
                                <Image
                                  src={imageUrl}
                                  style={{
                                    width: "10em",
                                    height: "10em",
                                  }}
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <Button
                                  style={{ backgroundColor: "transparent" }}
                                  onClick={() => setImageUrl("")}
                                >
                                  <IoIosRemoveCircle size="2em" color="red" />
                                </Button>
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                        <Grid
                          container
                          item
                          xs={9}
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          <Grid
                            item
                            xs={12}
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                          >
                            <FormikTextField name="firstName" label="Ad" />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                          >
                            <FormikTextField name="lastName" label="Soyad" />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                          >
                            <FormikTextField name="email" label="E-Posta" />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        style={{ marginTop: "1em", marginBottom: "1em" }}
                      >
                        <FormikTextField name="github" label="Github" />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ marginTop: "1em", marginBottom: "1em" }}
                      >
                        <FormikTextField name="linkedin" label="LinkedIn" />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ marginTop: "1em", marginBottom: "1em" }}
                      >
                        <FormikTextField name="coverLetter" label="Ön Yazı" />
                      </Grid>
                    </Paper>
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
                                  name={`languages[${index}].language`}
                                  label="Yabancı Dil"
                                />
                              </Grid>
                              <Grid item xs={5}>
                                <FormikTextField
                                  name={`languages[${index}].degree`}
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
                            onClick={() => push({ degree: "", language: "" })}
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
                                    name={`experiences[${index}].startingDate`}
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
                                    name={`experiences[${index}].quitDate`}
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
                                quitDate: "",
                                startingDate: "",
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
                                    name={`educations[${index}].startingDate`}
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
                                startingDate: "",
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
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
