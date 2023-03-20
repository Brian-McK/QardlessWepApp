import * as React from "react";
import AddCourse from "./AddCourse";
import CoursesTable from "./CoursesTable";
import Grid from "@mui/material/Grid";
import Title from "../Title";

export default function Courses() {
  return (
    <>
      <Title>Courses</Title>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item xs={12} sm={7} md={5}>
          <AddCourse />
        </Grid>
        <Grid item xs={12} sm={12} md={7}>
          <CoursesTable />
        </Grid>
      </Grid>
    </>
  );
}
