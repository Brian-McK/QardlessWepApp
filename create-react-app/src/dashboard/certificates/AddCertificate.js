import * as React from "react";
import Title from "../Title";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import SelectCourseForm from "./SelectCourseForm";
import CertificateDetailsForm from "./CertificateDetailsForm";
import EndUserDetailsForm from "./EndUserDetailsForm";
import UploadFileForm from "./UploadFileForm";
import * as yup from "yup";
import { Formik, Form } from "formik";

let dummyCourseItems = [
  {
    id: 1,
    courseTitle: "Forklift training",
  },
  {
    id: 2,
    courseTitle: "Manuel handling",
  },
  {
    id: 3,
    courseTitle: "Food safety training",
  },
];

const courseTitles = dummyCourseItems.map(function (obj) {
  return obj.courseTitle;
});

const validationSchemaAddCertificate = yup.object({
  selectCourse: yup.string().required("Course is required").oneOf(courseTitles),
  certNumber: yup
    .string("Enter certificate number")
    .required("Certificate number is required"),
  endUserEmail: yup.string().required().email(),
  pdf: yup.mixed().required("Pdf is required"),
});

export default function AddCertificate() {
  return (
    <>
      <Title>Add Certificate</Title>
      <Formik
        initialValues={{
          selectCourse: "",
          certNumber: "",
          endUserEmail: "",
          pdf: "",
          pdfUrl: "",
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
                <UploadFileForm />
              </Grid>
              <Grid item xs={12} sm={6}>
                <EndUserDetailsForm />
              </Grid>

              {props.isValid && Object.keys(props.errors).length === 0 ? (
                <Grid item xs={12} sm={6}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    Submit
                  </Button>
                </Grid>
              ) : null}
            </Grid>
            {/* {props.values && <p>{JSON.stringify(props.values)}</p>} */}

            {/* {props.errors && <p>{JSON.stringify(props.errors)}</p>} */}

            {props && <p>{JSON.stringify(props, null, 4)}</p>}
          </Form>
        )}
      </Formik>
    </>
  );
}
