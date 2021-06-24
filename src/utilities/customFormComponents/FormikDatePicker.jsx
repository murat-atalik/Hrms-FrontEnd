import { useField } from "formik";
import React from "react";
import { TextField } from "@material-ui/core";

export default function FormikDAtePicker({ name, ...props }) {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...props,
    type: "date",
    fullWidth: true,
    variant: "outlined",
    InputLabelProps: {
      shrink: true,
    },
  };
  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }
  return <TextField {...configDateTimePicker} />;
}
