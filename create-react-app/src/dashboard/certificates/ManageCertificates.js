import * as React from "react";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";
import CertificatesTable from "./CertificatesTable";
import Title from "../Title";

export default function ManageCertificates() {
  return (
    <>
      <Title>Manage Certificates</Title>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <CertificatesTable />
      </Stack>
    </>
  );
}
