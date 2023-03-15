import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Courses from "./courses/Courses";
import AddCertificate from "./certificates/AddCertificate";

export default function MainRoutes() {
  return (
    <Routes>
       {/* <Route path="/dashboard/overview" component={Overview} /> */}
      <Route path="/dashboard/courses" component={Courses} />
      <Route path="/dashboard/certificates" component={AddCertificate} />
    </Routes>
  );
}
