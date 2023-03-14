import * as React from "react";
import { useMemo, useEffect, useState, useLayoutEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Chip, FormHelperText, List, ListItem, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useFormikContext } from "formik";
import { BlobServiceClient } from "@azure/storage-blob";

let storageAccountName = process.env.REACT_APP_STORAGE_ACCOUNT_NAME;
let sasToken = process.env.REACT_APP_SAS_TOKEN;

const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
);

const containerClient = blobService.getContainerClient("test-brian");

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

export default function UploadFileForm({ formReset, onFormReset }) {
  const { handleChange, values, errors, touched, setFieldValue } =
    useFormikContext();

  const [displayFeedback, setDisplayFeedback] = useState(false);

  const [files, setFiles] = useState([]);

  function resetFormResetParent() {
    onFormReset(false);
  }

  useEffect(() => {
    handleFileUpload(values.pdf).then((url) => setFieldValue("pdfUrl", url));
  }, [values.pdf]);

  useLayoutEffect(() => {
    if (formReset) {
      setFiles([]);
    }

    return () => resetFormResetParent(false);
  }, [formReset]);

  const handleFileUpload = async (file) => {
    if (!file) {
      return;
    }

    if (!containerClient.exists) {
      await containerClient.create({
        access: "container",
      });
    }

    try {
      // check extension
      if (!file.path.endsWith(".pdf")) {
        throw new Error("File must be a PDF");
      }

      // Upload the file content
      const fileName = `${file.name}`;
      const fileType = `${file.type}`;

      const blobOptions = { blobHTTPHeaders: { blobContentType: fileType } };

      const blobClient = containerClient.getBlockBlobClient(fileName);

      const response = await blobClient.uploadBrowserData(file, blobOptions);

      if (response._response.status === 201) {
        const url = blobClient.url;

        return url.split("?")[0];
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

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
    onDropAccepted: (acceptedFiles) => {
      setDisplayFeedback(true);

      const acceptedFileItems = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFieldValue("pdf", acceptedFileItems[0]);

      setFiles((files) => [acceptedFileItems[0], ...files]);
    },
    onDropRejected: () => {
      setDisplayFeedback(true);

      setFieldValue("pdf", "");
    },
  });

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, []);

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

  const acceptedFileItems = files.map((file) => (
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
