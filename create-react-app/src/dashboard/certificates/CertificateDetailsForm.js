import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const validationSchemaCertificateDetails = yup.object({
  certNumber: yup
    .string("Enter certificate number")
    .required("Certificate number is required"),
});

export default function CertificateDetailsForm() {
  const formikCertificateDetails = useFormik({
    initialValues: {
      certNumber: "",
    },
    validationSchema: validationSchemaCertificateDetails,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>Certificate Details</h4>
            {/* Form Start */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <form onSubmit={formikCertificateDetails.handleSubmit}>
                <TextField
                  variant="filled"
                  fullWidth
                  id="certNumber"
                  type="text"
                  name="certNumber"
                  label="Certificate Number"
                  value={formikCertificateDetails.values.certNumber}
                  onChange={formikCertificateDetails.handleChange}
                  error={
                    formikCertificateDetails.touched.certNumber &&
                    Boolean(formikCertificateDetails.errors.certNumber)
                  }
                  helperText={
                    formikCertificateDetails.touched.certNumber &&
                    formikCertificateDetails.errors.certNumber
                  }
                />
              </form>
            </LocalizationProvider>

            {/* Form End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
