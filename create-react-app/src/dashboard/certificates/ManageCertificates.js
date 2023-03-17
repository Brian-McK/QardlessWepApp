import * as React from "react";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";
import CertificatesTable from "./CertificatesTable";

export default function ManageCertificates() {
  return (
    <>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <CertificatesTable />
      </Stack>
    </>
  );
}
