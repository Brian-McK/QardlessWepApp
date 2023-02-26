import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AddCourse from "./AddCourse";
import CoursesTable from "./CoursesTable";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";

export default function Courses() {
  return (
    <>
      <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
        <AddCourse />
        <CoursesTable />
      </Stack>
    </>
  );
}
