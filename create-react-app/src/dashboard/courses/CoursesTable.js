import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AddCourse from "./AddCourse";

export default function CoursesTable() {
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item sm={12} md={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>Courses Table</h4>
            {/* Table Start */}

            {/* Table End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
