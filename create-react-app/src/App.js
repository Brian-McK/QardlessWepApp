import * as React from "react";
import Dashboard from "../src/dashboard/Dashboard";
import { SharedSnackbarProvider } from "./providers/SharedSnackbar.context";
import Login from "./dashboard/Login/Login";
import { Routes, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./providers/Auth.context";

export default function App() {
  return (
      <SharedSnackbarProvider>
        <AuthProvider>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </SharedSnackbarProvider>
  );
}
