import * as React from "react";
import Dashboard from "../src/dashboard/Dashboard";
import { SharedSnackbarProvider } from "./providers/SharedSnackbar.context";
import Login from "./dashboard/Login/Login";
import { UserContext } from "./providers/User.context";

export default function App() {
  const [user, setUser] = React.useState(null);

  // will only change if value and setValue is changed
  const providerValue = React.useMemo(
    () => ({ user, setUser }),
    [user, setUser]
  );

  return (
    <div>
      <SharedSnackbarProvider>
        {/* <Login /> */}
        <UserContext.Provider value={providerValue}>
          <Dashboard />
        </UserContext.Provider>
      </SharedSnackbarProvider>
    </div>
  );
}
