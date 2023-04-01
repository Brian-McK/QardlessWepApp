import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    title: "",
  });
  const [promiseInfo, setPromiseInfo] = useState();

  const showDialog = (options) => {
    return new Promise((resolve, reject) => {
      setPromiseInfo({ resolve, reject });
      setOptions(options);
      setIsOpen(true);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    promiseInfo?.resolve(true);
    setPromiseInfo(undefined);
  };

  const handleCancel = () => {
    setIsOpen(false);
    promiseInfo?.resolve(false);
    setPromiseInfo(undefined);
  };
  
  return (
    <>
      <Dialog open={isOpen} onClose={handleCancel}>
        <DialogTitle>{options.title}</DialogTitle>
        <DialogContent sx={{ minWidth: "400px" }}>
          {options.message && (
            <DialogContentText>{options.message}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <DialogContext.Provider value={showDialog}>
        {children}
      </DialogContext.Provider>
    </>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};

export default DialogProvider;
