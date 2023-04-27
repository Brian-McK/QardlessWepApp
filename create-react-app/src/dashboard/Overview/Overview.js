import * as React from "react";
import Title from "../Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ActiveCerts from "./ActiveCerts";
import { useGetAllCertificatesByBusinessIdQuery } from "../../api/services/certificates";
import { useAuth } from "../../providers/Auth.context";
import FlaggedIssues from "./FlaggedIssues";
import {
  useGetFlaggedIssueByIdQuery,
  useGetFlaggedIssuesByBusinessIdQuery,
} from "../../api/services/flaggedIssues";
import CertificatesCreated from "./CertificatesCreated";

export default function Overview() {
  const { user } = useAuth();

  const {
    data: allCerts = [],
    error: allCertsError,
    isLoading: allCertsIsLoading,
    isError: allCertsIsError,
    isSuccess: allCertsIsSuccess,
  } = useGetAllCertificatesByBusinessIdQuery(user.businessId);

  const {
    data: allFlaggedIssues = [],
    error: allFlaggedIssuesError,
    isLoading: allFlaggedIssuesIsLoading,
    isError: allFlaggedIssuesIsError,
    isSuccess: allFlaggedIssuesIsSuccess,
  } = useGetFlaggedIssuesByBusinessIdQuery(user.businessId);

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
              alignItems: "center",
              height: 250,
            }}
          >
            <FlaggedIssues flaggedData={allFlaggedIssues} />
          </Paper>
        </Grid>
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
            <CertificatesCreated certData={allCerts} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
