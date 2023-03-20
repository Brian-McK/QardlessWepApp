import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import {
  useGetAllCertificatesByBusinessIdQuery,
  useDeleteCertificateMutation,
  useFreezeCertificateMutation,
  useUnfreezeCertificateMutation,
} from "../../api/services/certificates";
import { useAuth } from "../../providers/Auth.context";
import { SharedSnackbarContext } from "../../providers/SharedSnackbar.context";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

export default function CertificatesTable() {
  const { user } = useAuth();

  const snackBarContext = React.useContext(SharedSnackbarContext);

  const {
    data = [],
    error,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllCertificatesByBusinessIdQuery(user.businessId);

  const [deleteCertificate, deleteResponse] = useDeleteCertificateMutation();

  const [freezeCertificate, freezeResponse] = useFreezeCertificateMutation();

  const [unfreezeCertificate, unfreezeResponse] =
    useUnfreezeCertificateMutation();

  const deleteCertificateHandler = React.useCallback(
    (id) => () => {
      deleteCertificate(id);
    },
    [data]
  );

  React.useLayoutEffect(() => {
    if (deleteResponse.isSuccess) {
      snackBarContext.openSnackbar(`Deleted Successfully!`);
    }
    if (deleteResponse.isError) {
      snackBarContext.openSnackbar(`Problem Deleting that certificate!`);
    }
  }, [deleteResponse]);

  const toggleFreezeCertificateHandler = React.useCallback(
    (params) => () => {
      console.log(params);

      if (params.row.isFrozen) {
        console.log("unfreeze called");

        unfreezeCertificate(params.row.id);
      } else {
        console.log("freeze called");
        freezeCertificate(params.row.id);
      }
    },
    [data]
  );

  React.useLayoutEffect(() => {
    if (freezeResponse.isSuccess) {
      snackBarContext.openSnackbar(`Freeze certificate Successfully!`);
    }
    if (freezeResponse.isError) {
      snackBarContext.openSnackbar(`Problem freezing certificate!`);
    }

    if (unfreezeResponse.isSuccess) {
      snackBarContext.openSnackbar(`Unfreeze certificate Successfully!`);
    }
    if (unfreezeResponse.isError) {
      snackBarContext.openSnackbar(`Problem unfreezing certificate!`);
    }
  }, [freezeResponse, unfreezeResponse]);

  const dataGridDataCols = [
    {
      field: "certNumber",
      headerName: "Cert Number",
      description: "The certificate number",
      width: 150,
    },
    {
      field: "title",
      headerName: "Course Title",
      description: "The title of the course",
      width: 200,
      valueGetter: (params) => `${params.row.course.title}`,
    },
    {
      field: "courseDate",
      headerName: "Course Date",
      description: "The date of when the course was held",
      width: 150,
      valueGetter: (params) => `${params.row.course.courseDate}`,
    },
    {
      field: "expiry",
      headerName: "Course Expiry",
      description: "The date of when the course expires",
      width: 150,
      valueGetter: (params) => `${params.row.course.expiry}`,
    },
    {
      field: "isFrozen",
      headerName: "Status",
      description: "Shows wether the certificate is active or frozen",
      width: 100,
      valueGetter: (params) => {
        if (params.row.isFrozen) {
          return `Frozen`;
        }
        return `Active`;
      },
    },
    {
      field: "actions",
      description: "Delete / toggle freeze, unfreeze certificates",
      type: "actions",
      headerName: "Actions",
      width: "80",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteCertificateHandler(params.id)}
        />,
        <GridActionsCellItem
          icon={<AcUnitIcon />}
          label="Freeze"
          onClick={toggleFreezeCertificateHandler(params)}
        />,
      ],
    },
  ];

  React.useEffect(() => {}, [data]);

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>Certificates</h4>
            {/* Table Start */}
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                loading={isLoading}
                rows={data}
                columns={dataGridDataCols}
                autoHeight
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                slots={{ toolbar: CustomToolbar }}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
            {/* Table End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
