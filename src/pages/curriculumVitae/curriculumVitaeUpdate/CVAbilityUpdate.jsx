// import React, { useEffect, useState } from "react";
// import { Form, Formik, useFormik } from "formik";
// import * as yup from "yup";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";

// import { Grid, MenuItem } from "@material-ui/core";

// import FormikTextField from "../../utilities/customFormComponents/FormikTextField";

// import FormikButton from "../../utilities/customFormComponents/FormikButton";

// import StafffSideMenu from "../staff/StaffSideMenu";

// export default function CVAbilityUpdate() {
//   const [staff, setStaff] = useState([]);

//   const validationSchema = yup.object({
//     email: yup
//       .string("E-posta adresinizi girin")
//       .required("E-posta adresi gerekli!")
//       .email("Geçersiz e-posta"),
//   });

//   const handleSubmit = (values) => {
//     alert(JSON.stringify(values, null, 2));
//     //     staffService
//     //       .update(values)
//     //       .then((result) => console.log(result.data.message));
//     //     //alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
//   };
//   return (
//     <Grid
//       space={1}
//       container
//       direction="row"
//       justify="space-between"
//       alignItems="flex-start"
//     >
//       <Grid item xs={2}>
//         <StafffSideMenu />
//       </Grid>
//       <Grid item xs={9}>
//         <Formik
//           enableReinitialize={true}
//           initialValues={{
//             email: staff?.email || "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           <Form>
//             <Grid container>
//               <Grid item xs={12}>
//                 <FormikTextField
//                   name="email"
//                   type="email"
//                   label="E-Posta Adresi"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormikButton>Güncelle</FormikButton>
//               </Grid>
//             </Grid>
//           </Form>
//         </Formik>
//       </Grid>
//     </Grid>
//   );
// }
