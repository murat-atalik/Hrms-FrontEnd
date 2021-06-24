import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const FormikButton = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default FormikButton;

// that didn't work children error
// import React from "react";
// import { Button } from "@material-ui/core";
// import { useFormikContext } from "formik";

// export default function FormikButton(children, ...props) {
//   const { submitForm } = useFormikContext();

//   const handleSubmit = () => {
//     submitForm();
//   };

//   const configButton = {
//     variant: "contained",
//     color: "primary",
//     fullWidth: true,
//     onClick: handleSubmit,
//   };
//   return (
//     <div>
//       <Button {...configButton}>{children}</Button>
//     </div>
//   );
// }
