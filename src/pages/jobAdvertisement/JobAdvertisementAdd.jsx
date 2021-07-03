import React, { useEffect, useState } from "react";

import { Form, Formik, useFormik } from "formik";
import * as yup from "yup";

import { Grid, Paper } from "@material-ui/core";

import FormikButton from "../../utilities/customFormComponents/FormikButton";
import FormikSelect from "../../utilities/customFormComponents/FormikSelect";
import FormikTextField from "../../utilities/customFormComponents/FormikTextField";
import FormikDAtePicker from "../../utilities/customFormComponents/FormikDatePicker";

import JobAdvertisementService from "../../services/jobAdvertisementService";
import CityService from "../../services/cityService";
import WorkProgramService from "../../services/workProgramService";
import JobPositionService from "../../services/jobPositionService";
import WorkTypeService from "../../services/workTypeService";

import EmployerSideMenu from "../employer/EmployerSideMenu";

export default function JobAdvertisementAdd() {
  const jobService = new JobAdvertisementService();

  const [cities, setCities] = useState([]);
  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
  }, []);
  const tCities = cities.map(({ id, cityName: value }) => ({ id, value }));

  const [workPrograms, setWorkPrograms] = useState([]);
  useEffect(() => {
    let workProgramService = new WorkProgramService();
    workProgramService
      .getWorkPrograms()
      .then((result) => setWorkPrograms(result.data.data));
  }, []);
  const tWorkPrograms = workPrograms.map(({ id, programName: value }) => ({
    id,
    value,
  }));
  const [jobPositions, setJobPositions] = useState([]);
  useEffect(() => {
    let jobPositionsService = new JobPositionService();
    jobPositionsService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);
  const tJobPositions = jobPositions.map(({ id, positionName: value }) => ({
    id,
    value,
  }));
  const [workTypes, setWorkTypes] = useState([]);
  useEffect(() => {
    let workTypeService = new WorkTypeService();
    workTypeService
      .getWorkTypes()
      .then((result) => setWorkTypes(result.data.data));
  }, []);
  const tWorkTypes = workTypes.map(({ id, workType: value }) => ({
    id,
    value,
  }));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const validationSchema = yup.object({
    jobDescription: yup
      .string("İş açıklamasını girin")
      .required("İş açıklaması gerekli!"),
    minSalary: yup
      .string("Minimum maaş ")
      .required("Minimum maaş gerekli!")
      .test(
        "Is grater than 2500",
        "En az asgari ücret değeri girebilirsiniz!",
        (value) => value > 2500
      ),
    maxSalary: yup
      .string("Maksimum maaş ")
      .required("Maksimum maaş gerekli")
      .test(
        "Is grater than minSalary",
        "Girilen minimum maaştan yüksek bir değer olmalı!",
        (value) => value > formik.values.minSalary
      ),
    openPosition: yup
      .string("Açık Pozisyon")
      .required("Açık pozisyon sayısı gerekli!")
      .test(
        "Is grater than 0",
        "En az açık pozisyon sayısı 1!",
        (value) => value > 0
      ),

    applicationDeadline: yup
      .string("Son başvuru tarihi")
      .required("Son Başvuru tarihi girilmeli")
      .test(
        "Son başvuru tarihi",
        "Son Başvuru tarihi en geç bugün olmalıdır",
        (value) => {
          let date = new Date(value);

          if (date.getTime() >= today.getTime()) {
            return true;
          } else return false;
        }
      ),
    workTypeId: yup
      .string("Açık Pozisyon")
      .required("Açık pozisyon sayısı gerekli!")
      .test(
        "Is grater than 0",
        "En az açık pozisyon sayısı 1!",
        (value) => value > 0
      ),
    active: yup.string("İş ilanı durumu").required("iş ilanı durumu gerekli"),
    employerId: yup
      .string("Employer id")
      .required("Employer gerekli!")
      .test(
        "Is grater than 0",
        "En az açık pozisyon sayısı 1!",
        (value) => value > 0
      ),
    workProgramId: yup
      .string("Çalışma programı")
      .required("Çalışma programıgerekli!")
      .test(
        "Is grater than 0",
        "En az açık pozisyon sayısı 1!",
        (value) => value > 0
      ),
    jobPositionId: yup
      .string("Çalışma Pozisyon")
      .required("Çalışma pozisyonu gerekli!")
      .test(
        "Is grater than 0",
        "En az açık pozisyon sayısı 1!",
        (value) => value > 0
      ),

    cityId: yup.string("Şehir Adı").required("Şehir adı Zorunlu"),
  });
  const formik = useFormik({
    initialValues: {
      jobDescription: "",
      minSalary: 0,
      maxSalary: 0,
      openPosition: 0,
      applicationDeadline: "",
      active: true,
      workTypeId: "",
      employerId: 1,
      workProgramId: "",
      jobPositionId: "",
      cityId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      jobService.add(values).then((result) => console.log(result.data.data));
      alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
    },
  });

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    console.log(values);
    jobService.add(values).then((result) => console.log(result.data.data));
    alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
  };

  return (
    <Grid
      space={1}
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item xs={3}>
        <EmployerSideMenu />
      </Grid>
      <Grid item xs={8}>
        <Paper style={{ backgroundColor: "#E5E5E5", padding: "4em" }}>
          <Formik
            initialValues={formik.initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormikTextField
                    name="jobDescription"
                    label="İş Açıklaması"
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <FormikDAtePicker
                    name="applicationDeadline"
                    label="Son başvuru tarihi"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikTextField
                    name="minSalary"
                    type="number"
                    label="Minimum maaş"
                  />
                </Grid>{" "}
                <Grid item xs={6}>
                  <FormikTextField
                    name="maxSalary"
                    type="number"
                    label="Maksimum maaş"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikTextField
                    name="openPosition"
                    type="number"
                    label="Açık pozisyon"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikSelect
                    name="jobPositionId"
                    label="Çalışma pozisyonu"
                    options={tJobPositions}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikSelect
                    name="workTypeId"
                    label="Çalışma programı"
                    options={tWorkTypes}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikSelect
                    name="workProgramId"
                    label="Çalışma programı"
                    options={tWorkPrograms}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikSelect name="cityId" label="Şehir" options={tCities} />
                </Grid>
                <Grid item xs={12}>
                  <FormikButton> İş İlanı Oluştur</FormikButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
