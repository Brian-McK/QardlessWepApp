import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFormikContext } from "formik";
import { TextField } from "@mui/material";

export default function EndUserDetailsForm() {
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
            <h4>Assign To User</h4>
            {/* Form Start */}

            <TextField
              variant="filled"
              fullWidth
              id="endUserEmail"
              type="email"
              name="endUserEmail"
              label="User email address"
              value={values.endUserEmail}
              onChange={handleChange}
              error={touched.endUserEmail && Boolean(errors.endUserEmail)}
              helperText={touched.endUserEmail && errors.endUserEmail}
            />

            {/* Form End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
