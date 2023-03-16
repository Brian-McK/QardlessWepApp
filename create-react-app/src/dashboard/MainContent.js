import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import AddCertificate from "./certificates/AddCertificate";
import Courses from "./courses/Courses";
import { Routes, Route } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Qardless "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function MainContent() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Routes>
        <Route path="/dashboard/courses" component={<Courses />} />
        <Route path="/dashboard/certificates" component={<AddCertificate />} />
      </Routes>
      <Outlet />
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
