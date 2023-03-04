import * as React from "react";
import { useMemo, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Chip, FormHelperText, List, ListItem, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useFormikContext } from "formik";

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
  const {
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setValues,
  } = useFormikContext();

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
    },
    onDrop: () => {},
    onDropAccepted: (acceptedFiles) => {
      setDisplayFeedback(true);

      const acceptedFileItems = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFieldValue("pdf", acceptedFileItems[0]);
    },
    onDropRejected: () => {
      setDisplayFeedback(true);

      setFieldValue("pdf", "");
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

  const truncateLabelName = (labelName, n) => {
    return labelName.length > n ? labelName.slice(0, n - 1) + "..." : labelName;
  };

  const acceptedFileItems = acceptedFiles.map((file) => (
    <Chip
      key={file.path}
      color="success"
      icon={<PictureAsPdfIcon />}
      label={`${truncateLabelName(file.path, 9)} - ${file.size} bytes`}
    />
  ));

  const fileRejectionItems = fileRejections.map(({ file }) => {
    return (
      <ListItem key={file.path}>
        <Chip color="error" label={`${file.path} - ${file.size} bytes`} />
      </ListItem>
    );
  });

  return (
    <>
      <Grid>
        <Grid item>
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
                <TextField
                  id="pdf"
                  name="pdf"
                  label="pdf"
                  onChange={handleChange}
                  {...getInputProps()}
                />
                <p>
                  Drag and drop PDF certificate here, or click to select file...
                </p>
              </Grid>

              <Grid item xs={12}>
                <FormHelperText
                  sx={{ marginLeft: "14px", marginRight: "14px" }}
                  error={touched.pdf && Boolean(errors.pdf)}
                >
                  {touched.pdf && errors.pdf}
                </FormHelperText>
              </Grid>

              {displayFeedback && (
                <Grid container>
                  {acceptedFileItems.length > 0 && (
                    <Grid item>
                      <h4>Accepted files</h4>
                      <List>{acceptedFileItems}</List>
                    </Grid>
                  )}

                  {fileRejectionItems.length > 0 && (
                    <Grid item>
                      <h4>Rejected files</h4>
                      <List
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          listStyle: "none",
                        }}
                      >
                        {fileRejectionItems}
                      </List>
                    </Grid>
                  )}
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
