import * as React from "react";
import Dashboard from "../src/dashboard/Dashboard";
import { SharedSnackbarProvider } from "./providers/SharedSnackbar.context";
import Login from "./dashboard/Login/Login";

export default function App() {
  return (
    <div>
      <SharedSnackbarProvider>
        {/* <Dashboard /> */}
        <Login />
      </SharedSnackbarProvider>
    </div>
  );
}
