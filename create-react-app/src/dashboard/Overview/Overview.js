import * as React from "react";
import Title from "../Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ActiveCerts from "./ActiveCerts";
import { useGetAllCertificatesByBusinessIdQuery } from "../../api/services/certificates";
import { useAuth } from "../../providers/Auth.context";

export default function Overview() {
  const { user } = useAuth();

  const {
    data: allCerts = [],
    error: allCertsError,
    isLoading: allCertsIsLoading,
    isError: allCertsIsError,
    isSuccess: allCertsIsSuccess,
  } = useGetAllCertificatesByBusinessIdQuery(user.businessId);

  console.log(allCerts);

  return (
    <>
      <Title>Overview</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: 250,
            }}
          >
            <ActiveCerts certData={allCerts} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Grid>
      </Grid>
    </>
  );
}
