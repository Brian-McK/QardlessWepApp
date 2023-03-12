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
import { SharedSnackbarContext } from "../../providers/SharedSnackbar.context";
import { useGetAllCoursesByBusinessIdQuery } from "../../api/services/courses";
import { useAddCertificateMutation } from "../../api/services/certificates";

export default function AddCertificate() {
  const [addCertificate, result] = useAddCertificateMutation();

  const {
    data = [],
    error,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllCoursesByBusinessIdQuery("c18a70cb-4226-496a-3e73-08db2303f52c"); // TESTING - Ethan change value here to the business id that created the course



  const snackBarContext = React.useContext(SharedSnackbarContext);

  // reset form if successfull, display snackbar is successful or not
  React.useEffect(() => {
    if (result.isSuccess == true) {
      snackBarContext.openSnackbar(
        `Certificate added for ${result.originalArgs.endUserEmail}!`
      );
    }

    if (result.isError == true) {
      snackBarContext.openSnackbar("Error Adding Certificate!");
    }
  }, [result.isSuccess, result.isError]);

  const validationSchemaAddCertificate = yup.object({
    selectCourse: yup.string().required("Course is required"),
    certNumber: yup
      .string("Enter certificate number")
      .required("Certificate number is required"),
    endUserEmail: yup.string().required().email(),
    pdf: yup.mixed().required("Pdf is required"),
  });

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
        onSubmit={async (values) => {
          console.log("values", values);

          const addCertificatePayload = {
            courseId: values.selectCourse,
            endUserEmail: values.endUserEmail,
            certNumber: values.certNumber,
            pdfUrl: values.pdfUrl,
          };

          addCertificate(addCertificatePayload);
        }}
      >
        {(props) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <SelectCourseForm courses={data} />
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

              <Grid item xs={12} sm={6}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={props.isSubmitting}
                >
                  Submit
                </Button>

                <p>{"isError: " + result.isError}</p>
                <p>{"isLoading: " + result.isLoading}</p>
                <p>{"isSuccess: " + result.isSuccess}</p>
                <p>{"values: " + JSON.stringify(props.values, null, 4)}</p>
                <p>{"data: " + JSON.stringify(result.data, null, 4)}</p>
                <p>{"result: " + JSON.stringify(result, null, 4)}</p>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
