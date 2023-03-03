import * as React from "react";
import Title from "../Title";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import SelectCourseForm from "./SelectCourseForm";
import CertificateDetailsForm from "./CertificateDetailsForm";
import EndUserDetailsForm from "./EndUserDetailsForm";
import UploadFileForm from "./UploadFileForm";
import * as yup from "yup";
import { Formik, useFormikContext, useFormik, Form } from "formik";

const validationSchemaAddCertificate = yup.object({
  selectCourse: yup.string("Select course").required("Course is required"),
  certNumber: yup
    .string("Enter certificate number")
    .required("Certificate number is required"),
  endUserEmail: yup.string().required().email(),
  pdf: yup.mixed().required("File is required"),
});

export default function AddCertificate() {
  // const { values, submitForm } = formikContext;

  // React.useEffect(() => {
  //   console.log(values);
  // }, [values]);

  return (
    <>
      <Title>Add Certificate</Title>
      <Formik
        initialValues={{
          selectCourse: "",
          certNumber: "",
          endUserEmail: "",
          pdf: "",
        }}
        validationSchema={validationSchemaAddCertificate}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(props) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <SelectCourseForm />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CertificateDetailsForm />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <UploadFileForm /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <EndUserDetailsForm />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>

                {props.errors && <p>{JSON.stringify(props.errors)}</p>}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
