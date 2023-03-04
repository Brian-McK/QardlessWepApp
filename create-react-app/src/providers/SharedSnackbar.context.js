import React, { useState } from "react";
import SharedSnackbar from "../shared/SharedSnackbar.component";

const SharedSnackbarContext = React.createContext();

const SharedSnackbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openSnackbar = (message) => {
    setMessage(message);
    setIsOpen(true);
  };

  const closeSnackbar = () => {
    setMessage("");
    setIsOpen(false);
  };

  return (
    <SharedSnackbarContext.Provider
      value={{
        openSnackbar,
        closeSnackbar,
        snackbarIsOpen: isOpen,
        message,
      }}
    >
      <SharedSnackbar />

      {children}
    </SharedSnackbarContext.Provider>
  );
};

const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;

export { SharedSnackbarProvider, SharedSnackbarConsumer };
