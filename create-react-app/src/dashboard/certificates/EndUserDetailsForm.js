import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";


export default function EndUserDetailsForm() {

  return (
    <>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12} lg={12} >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>User Details</h4>
            {/* Form Start */}
            

           

            {/* Form End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
