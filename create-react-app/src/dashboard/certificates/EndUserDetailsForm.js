import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const validationSchemaEndUserDetails = yup.object({
  email: yup.string().required().email(),
});

export default function EndUserDetailsForm() {
  const formikEndUserDetails = useFormik({
    initialValues: {
      endUserEmail: "",
    },
    validationSchema: validationSchemaEndUserDetails,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validateOnChange: true,
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
            <h4>Assign To User</h4>
            {/* Form Start */}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <form onSubmit={formikEndUserDetails.handleSubmit}>
                <TextField
                  variant="filled"
                  fullWidth
                  id="endUserEmail"
                  type="email"
                  name="endUserEmail"
                  label="User email address"
                  value={formikEndUserDetails.values.endUserEmail}
                  onChange={formikEndUserDetails.handleChange}
                  error={
                    formikEndUserDetails.touched.endUserEmail &&
                    Boolean(formikEndUserDetails.errors.endUserEmail)
                  }
                  helperText={
                    formikEndUserDetails.touched.endUserEmail &&
                    formikEndUserDetails.errors.endUserEmail
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
