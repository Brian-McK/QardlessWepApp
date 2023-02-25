import * as React from "react";
import { useMemo, useEffect, useState } from "react";
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
  color: "#696969",
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
  const [files, setFiles] = useState([]);

  const [displayFeedback, setDisplayFeedback] = useState(false);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    maxFiles: 1,
    onFileDialogOpen: () => {
      setDisplayFeedback(false);
      console.log("onFileDialogOpen");
    },
    onDrop: () => {
      console.log("file dropped");
    },
    onDropAccepted: (acceptedFiles) => {
      setDisplayFeedback(true);

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      console.log("onDropAccepted", files);
    },
    onDropRejected: (fileRejections) => {
      setDisplayFeedback(true);

      console.log("onDropRejected", fileRejections);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

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

            <Grid container>
              <Grid item xs={12} {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>
                  Drag and drop PDF certificates here, or click to select
                  file...
                </p>
              </Grid>

              {displayFeedback && (
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <h4>Accepted files</h4>
                    <ul>{acceptedFileItems}</ul>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <h4>Rejected files</h4>
                    <ul>{fileRejectionItems}</ul>
                  </Grid>
                </Grid>
              )}
            </Grid>

            {/* Form End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
