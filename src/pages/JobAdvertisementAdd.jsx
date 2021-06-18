import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import JobAdvertisementService from "../services/jobAdvertisementService";

import { Grid, MenuItem } from "@material-ui/core";
import CityService from "../services/cityService";

import JobPositionService from "../services/jobPositionService";
import WorkProgramService from "../services/workProgramService";
import WorkTypeService from "../services/workTypeService";
import { Paper } from "@material-ui/core";

export default function JobAdvertisementAdd() {
  const jobService = new JobAdvertisementService();
  const [cities, setCities] = useState([]);
  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
  }, []);
  const [workPrograms, setWorkPrograms] = useState([]);
  useEffect(() => {
    let workProgramService = new WorkProgramService();
    workProgramService
      .getWorkPrograms()
      .then((result) => setWorkPrograms(result.data.data));
  }, []);
  const [jobPositions, setJobPositions] = useState([]);
  useEffect(() => {
    let jobPositionsService = new JobPositionService();
    jobPositionsService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);
  const [workTypes, setWorkTypes] = useState([]);
  useEffect(() => {
    let workTypeService = new WorkTypeService();
    workTypeService
      .getWorkTypes()
      .then((result) => setWorkTypes(result.data.data));
  }, []);
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

    cityPlateNumber: yup
      .string("Şehir plaka kodu")
      .required("Şehir plaka kodu"),
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
      cityPlateNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      jobService.add(values).then((result) => console.log(result.data.data));
      alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
    },
  });

  return (
    <div>
      <Paper style={{ backgroundColor: "#E5E5E5", padding: "4em" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            multiline
            id="jobDescription"
            name="jobDescription"
            label="İş Açıklaması"
            type="text"
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.jobDescription &&
              Boolean(formik.errors.jobDescription)
            }
            helperText={
              formik.touched.jobDescription && formik.errors.jobDescription
            }
          />
          <Grid
            space={2}
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={5}>
              <TextField
                fullWidth
                style={{ margin: "1em" }}
                id="minSalary"
                name="minSalary"
                type="number"
                label="En düşük maaş"
                value={formik.values.minSalary}
                onChange={formik.handleChange}
                error={
                  formik.touched.minSalary && Boolean(formik.errors.minSalary)
                }
                helperText={formik.touched.minSalary && formik.errors.minSalary}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                style={{ margin: "1em" }}
                id="maxSalary"
                name="maxSalary"
                type="number"
                label="En yüksek maaş"
                value={formik.values.maxSalary}
                onChange={formik.handleChange}
                error={
                  formik.touched.maxSalary && Boolean(formik.errors.maxSalary)
                }
                helperText={formik.touched.maxSalary && formik.errors.maxSalary}
              />
            </Grid>
          </Grid>
          <Grid
            space={2}
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={5}>
              <TextField
                fullWidth
                style={{ margin: "1em" }}
                id="openPosition"
                name="openPosition"
                type="number"
                label="Açık pozisyon sayısı"
                value={formik.values.openPosition}
                onChange={formik.handleChange}
                error={
                  formik.touched.openPosition &&
                  Boolean(formik.errors.openPosition)
                }
                helperText={
                  formik.touched.openPosition && formik.errors.openPosition
                }
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                style={{ margin: "1em" }}
                id="jobPositionId"
                name="jobPositionId"
                select
                label="İş pozisyonu"
                value={formik.values.jobPositionId}
                onChange={formik.handleChange}
                error={
                  formik.touched.jobPositionId &&
                  Boolean(formik.errors.jobPositionId)
                }
                helperText={
                  formik.touched.jobPositionId && formik.errors.jobPositionId
                }
              >
                {jobPositions.map((jobPosition) => (
                  <MenuItem key={jobPosition.id} value={jobPosition.id}>
                    {jobPosition.positionName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid
            space={2}
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={5}>
              <TextField
                fullWidth
                style={{ margin: "1em" }}
                id="workTypeId"
                name="workTypeId"
                select
                label="Çalışma şekli"
                value={formik.values.workTypeId}
                onChange={formik.handleChange}
                error={
                  formik.touched.workTypeId && Boolean(formik.errors.workTypeId)
                }
                helperText={
                  formik.touched.workTypeId && formik.errors.workTypeId
                }
              >
                {workTypes.map((workType) => (
                  <MenuItem key={workType.id} value={workType.id}>
                    {workType.workType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                style={{ margin: "1em" }}
                id="workProgramId"
                name="workProgramId"
                select
                label="Çalışma programı"
                value={formik.values.workProgramId}
                onChange={formik.handleChange("workProgramId")}
                error={
                  formik.touched.workProgramId &&
                  Boolean(formik.errors.workProgramId)
                }
                helperText={
                  formik.touched.workProgramId && formik.errors.workProgramId
                }
              >
                {workPrograms.map((workProgram) => (
                  <MenuItem key={workProgram.id} value={workProgram.id}>
                    {workProgram.programName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid
            space={2}
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={5}>
              <TextField
                fullWidth
                style={{ margin: "1em" }}
                id="cityPlateNumber"
                name="cityPlateNumber"
                select
                label="Şehir"
                value={formik.values.cityPlateNumber}
                onChange={formik.handleChange("cityPlateNumber")}
                error={
                  formik.touched.cityPlateNumber &&
                  Boolean(formik.errors.cityPlateNumber)
                }
                helperText={
                  formik.touched.cityPlateNumber &&
                  formik.errors.cityPlateNumber
                }
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.plateNumber}>
                    {city.cityName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                style={{ margin: "1em" }}
                id="applicationDeadline"
                name="applicationDeadline"
                type="date"
                label="Son Başvuru Tarihi"
                value={formik.values.applicationDeadline}
                onChange={formik.handleChange}
                error={
                  formik.touched.applicationDeadline &&
                  Boolean(formik.errors.applicationDeadline)
                }
                helperText={
                  formik.touched.applicationDeadline &&
                  formik.errors.applicationDeadline
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Button color="primary" variant="contained" fullWidth type="submit">
            İş İlanı Oluştur
          </Button>
        </form>
      </Paper>
    </div>
  );
}
