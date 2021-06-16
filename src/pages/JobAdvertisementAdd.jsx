import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import JobAdvertisementService from "../services/jobAdvertisementService";

export default function JobAdvertisementAdd() {
  const jobService = new JobAdvertisementService();
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

    applicationDeadLine: yup
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
    remoteId: yup
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
      applicationDeadLine: "",
      active: true,
      remoteId: 0,
      employerId: 1,
      workProgramId: 0,
      jobPositionId: 0,
      cityPlateNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      jobService.add(values).then((result) => console.log(result.data.data));
      alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
    },
  });

  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
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
          <TextField
            fullWidth
            id="minSalary"
            name="minSalary"
            type="number"
            label="En düşük maaş"
            value={formik.values.minSalary}
            onChange={formik.handleChange}
            error={formik.touched.minSalary && Boolean(formik.errors.minSalary)}
            helperText={formik.touched.minSalary && formik.errors.minSalary}
          />
          <TextField
            fullWidth
            id="maxSalary"
            name="maxSalary"
            type="number"
            label="En yüksek maaş"
            value={formik.values.maxSalary}
            onChange={formik.handleChange}
            error={formik.touched.maxSalary && Boolean(formik.errors.maxSalary)}
            helperText={formik.touched.maxSalary && formik.errors.maxSalary}
          />
          <TextField
            fullWidth
            id="openPosition"
            name="openPosition"
            type="number"
            label="Açık pozisyon sayısı"
            value={formik.values.openPosition}
            onChange={formik.handleChange}
            error={
              formik.touched.openPosition && Boolean(formik.errors.openPosition)
            }
            helperText={
              formik.touched.openPosition && formik.errors.openPosition
            }
          />
          <TextField
            fullWidth
            id="applicationDeadLine"
            name="applicationDeadLine"
            type="date"
            label="Son Başvuru Tarihi"
            value={formik.values.applicationDeadLine}
            onChange={formik.handleChange}
            error={
              formik.touched.applicationDeadLine &&
              Boolean(formik.errors.applicationDeadLine)
            }
            helperText={
              formik.touched.applicationDeadLine &&
              formik.errors.applicationDeadLine
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="remoteId"
            name="remoteId"
            type="number"
            label="Çalışma şekli"
            value={formik.values.remoteId}
            onChange={formik.handleChange}
            error={formik.touched.remoteId && Boolean(formik.errors.remoteId)}
            helperText={formik.touched.remoteId && formik.errors.remoteId}
          />
          <TextField
            fullWidth
            id="workProgramId"
            name="workProgramId"
            type="number"
            label="Çalışma programı"
            value={formik.values.workProgramId}
            onChange={formik.handleChange}
            error={
              formik.touched.workProgramId &&
              Boolean(formik.errors.workProgramId)
            }
            helperText={
              formik.touched.workProgramId && formik.errors.workProgramId
            }
          />
          <TextField
            fullWidth
            id="jobPositionId"
            name="jobPositionId"
            type="number"
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
          />

          <TextField
            fullWidth
            id="cityPlateNumber"
            name="cityPlateNumber"
            label="Şehir plaka numarası"
            type="text"
            value={formik.values.cityPlateNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.cityPlateNumber &&
              Boolean(formik.errors.cityPlateNumber)
            }
            helperText={
              formik.touched.cityPlateNumber && formik.errors.cityPlateNumber
            }
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
