import * as React from "react";
import Title from "../Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CourseForm from "./CourseForm";

export default function CreateCertificate() {
  return (
    <>
      <Title>Create Certificate</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 480,
            }}
          >
            <CourseForm />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
