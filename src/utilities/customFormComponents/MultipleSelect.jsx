import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

export default function MultipleSelect({ name, options, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };
  const [formState, setFormState] = React.useState({
    userRoles: [],
  });

  const handleFieldChange = (event) => {
    console.log(event);
    event.persist();
    setFormState((formState) => ({
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };
  const configTextField = {
    ...field,
    ...props,
    select: true,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
    SelectProps: {
      multiple: true,
      value: formState.options?.value || [],
      onChange: handleFieldChange,
    },
  };
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <TextField {...configTextField}>
      {options.map((option) => {
        return (
          <MenuItem key={option.id} value={option.id}>
            {option.value}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
