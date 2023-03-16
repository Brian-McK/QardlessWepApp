import * as React from "react";
import Dashboard from "../src/dashboard/Dashboard";
import { SharedSnackbarProvider } from "./providers/SharedSnackbar.context";
import Login from "./dashboard/Login/Login";
import { Routes, Route, Switch, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/Auth.context";
import NotFound from "./generics/NotFound";
import Unauthorized from "./generics/Unauthorized";
import { RequireAuth } from "./providers/Auth.context";
import MainContent from "./dashboard/MainContent";

export default function App() {
  return (
    <SharedSnackbarProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SharedSnackbarProvider>
  );
}
