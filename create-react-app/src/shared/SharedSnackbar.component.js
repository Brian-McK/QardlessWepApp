import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { SharedSnackbarConsumer } from "../providers/SharedSnackbar.context";

const SharedSnackbar = () => (
  <SharedSnackbarConsumer>
    {({ snackbarIsOpen, message, closeSnackbar }) => (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarIsOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={message}
        action={[
          <IconButton key="close" color="inherit" onClick={closeSnackbar}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    )}
  </SharedSnackbarConsumer>
);

export default SharedSnackbar;
