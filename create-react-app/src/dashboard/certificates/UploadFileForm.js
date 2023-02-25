import * as React from "react";
import { useMemo } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 5,
  borderRadius: 5,
  borderColor: "rgb(25, 118, 210, 0.5)",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "grey",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "rgb(25, 118, 210, 0.5)",
};

const acceptStyle = {
  borderColor: "#357a38",
};

const rejectStyle = {
  borderColor: "#f44336",
};

export default function UploadFileForm() {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "application/pdf": [".pdf"] } });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>Upload Certificate PDF</h4>
            {/* Form Start */}

            <div className="container">
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>
                  Drag and drop certificate PDF here, or click to select file
                </p>
              </div>
            </div>

            {/* Form End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
