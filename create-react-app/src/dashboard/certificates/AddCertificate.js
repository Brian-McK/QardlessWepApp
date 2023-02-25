import * as React from "react";
import Title from "../Title";
import Grid from "@mui/material/Grid";
import SelectCourseForm from "./SelectCourseForm";
import CertificateDetailsForm from "./CertificateDetailsForm";
import EndUserDetailsForm from "./EndUserDetailsForm";
import UploadFileForm from "./UploadFileForm";

export default function AddCertificate() {
  return (
    <>
      <Title>Add Certificate</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <SelectCourseForm />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CertificateDetailsForm />
        </Grid>
        <Grid item xs={12} sm={4}>
          <EndUserDetailsForm />
        </Grid>
        <Grid item xs={12}>
          <UploadFileForm />
        </Grid>
      </Grid>
    </>
  );
}
