import * as React from "react";
import Title from "../Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Overview() {
  return (
    <>
      <Title>Overview</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            
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
