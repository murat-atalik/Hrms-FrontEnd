import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

export default function FormikSelect({ name, options, ...props }) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  console.log(field);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configTextField = {
    ...field,
    ...props,
    select: true,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
  };
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <TextField {...configTextField}>
      {options.map((item) => {
        return (
          <MenuItem key={item.id} value={item.roleName}>
            {item.roleName}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
