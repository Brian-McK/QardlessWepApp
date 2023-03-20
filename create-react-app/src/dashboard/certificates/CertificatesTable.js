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
import { useGetAllCertificatesByBusinessIdQuery } from "../../api/services/certificates";
import { useDeleteCertificateMutation } from "../../api/services/certificates";
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
  // "businessId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",

  const { user } = useAuth();

  const snackBarContext = React.useContext(SharedSnackbarContext);

  const {
    data = [],
    error,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllCertificatesByBusinessIdQuery(user.businessId);

  const [deleteCertificate, response] = useDeleteCertificateMutation();

  const deleteCertificateHandler = React.useCallback(
    (id) => () => {
      deleteCertificate(id);
    },
    [data]
  );

  React.useLayoutEffect(() => {
    if (response.isSuccess) {
      snackBarContext.openSnackbar(`Deleted Successfully!`);
    }
    if (response.isError) {
      snackBarContext.openSnackbar(`Problem Deleting that certificate!`);
    }
  }, [response]);

  const freezeCertificate = React.useCallback(
    (id) => () => {
      console.log(id);
    },
    []
  );

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
          onClick={freezeCertificate(params.id)}
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
