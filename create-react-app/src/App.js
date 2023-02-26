import * as React from "react";
import Dashboard from "../src/dashboard/Dashboard";
import { SharedSnackbarProvider } from "./providers/SharedSnackbar.context";

export default function App() {
  return (
    <div>
      <SharedSnackbarProvider>
        <Dashboard />
      </SharedSnackbarProvider>
    </div>
  );
}
