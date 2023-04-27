import * as React from "react";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";
import FlaggedIssuesTable from "./FlaggedIssuesTable";
import Title from "../Title";

export default function FlaggedIssues() {
  return (
    <>
      <Title>Flagged Certificate Issues</Title>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <FlaggedIssuesTable />
      </Stack>
    </>
  );
}
