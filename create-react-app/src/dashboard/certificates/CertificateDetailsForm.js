import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

export default function CertificateDetailsForm() {
  const { handleChange, values, errors, touched } = useFormikContext();

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
            <TextField
              variant="filled"
              fullWidth
              id="certNumber"
              type="text"
              name="certNumber"
              label="Certificate Number"
              value={values.certNumber}
              onChange={handleChange}
              error={touched.certNumber && Boolean(errors.certNumber)}
              helperText={touched.certNumber && errors.certNumber}
            />

            {/* Form End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
