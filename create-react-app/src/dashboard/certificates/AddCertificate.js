import * as React from "react";
import Title from "../Title";
import Grid from "@mui/material/Grid";
import SelectCourseForm from "./SelectCourseForm";
import CertificateDetailsForm from "./CertificateDetailsForm";
import EndUserDetailsForm from "./EndUserDetailsForm";

export default function AddCertificate() {
  return (
    <>
      <Title>Add Certificate</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SelectCourseForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CertificateDetailsForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EndUserDetailsForm />
        </Grid>
      </Grid>
    </>
  );
}
