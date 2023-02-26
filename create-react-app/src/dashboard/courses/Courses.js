import * as React from "react";
import AddCourse from "./AddCourse";
import CoursesTable from "./CoursesTable";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";

export default function Courses() {

  return (
    <>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <AddCourse />
        <CoursesTable />
      </Stack>
    </>
  );
}
