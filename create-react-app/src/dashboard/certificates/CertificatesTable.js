import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  useGetAllCertificatesByBusinessIdQuery,
  useDeleteCertificateMutation,
  useFreezeCertificateMutation,
  useUnfreezeCertificateMutation,
} from "../../api/services/certificates";
import { useAuth } from "../../providers/Auth.context";
import { SharedSnackbarContext } from "../../providers/SharedSnackbar.context";
import dayjs from "dayjs";
import { useDialog } from "../../providers/Dialog.context";

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ display: "flex", padding: "24px" }}>
      <GridToolbarFilterButton />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      <GridToolbarQuickFilter sx={{ marginLeft: "auto" }} />
    </GridToolbarContainer>
  );
}

export default function CertificatesTable() {
  const { user } = useAuth();

  const showDialog = useDialog();

  const now = dayjs();

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

  React.useLayoutEffect(() => {
    if (deleteResponse.isSuccess) {
      snackBarContext.openSnackbar(`Deleted Successfully!`);
    }
    if (deleteResponse.isError) {
      snackBarContext.openSnackbar(`Problem Deleting that certificate!`);
    }
  }, [deleteResponse]);

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

  function getDaysTillExpiry(params) {
    const expiryDate = dayjs(params?.row?.course?.expiry);

    return `${expiryDate.diff(now, "day")} days`;
  }

  const handleConfirmOpenPDF = async (params) => {
    const confirmed = await showDialog({
      title: `${"PDF"}`,
      message: `${"Open PDF in new tab?"}`,
    });
    if (confirmed) {
      const pdfWindow = window.open();
      pdfWindow.location.href = params.row.pdfUrl;
    }
  };

  const handleConfirmFreezeUnfreeze = async (params) => {
    const confirmed = await showDialog({
      title: params.row.isFrozen
        ? `Certificate ${params.row.certNumber} status: Frozen`
        : `Certificate ${params.row.certNumber} status: Active`,
      message: params.row.isFrozen
        ? `Would you like to unfreeze certificate ${params.row.certNumber}?`
        : `Would you like to freeze certificate ${params.row.certNumber}?`,
    });
    if (confirmed) {
      params.row.isFrozen
        ? unfreezeCertificate(params.row.id)
        : freezeCertificate(params.row.id);
    }
  };

  const handleConfirmDelete = async (params) => {

    const confirmed = await showDialog({
      title: `Certificate ${params.row.certNumber}`,
      message: `Are you sure you want to delete the certificate ${params.row.certNumber}?`,
    });
    if (confirmed) {
      deleteCertificate(params.id);
    }
  };

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
      valueGetter: (params) =>
        `${dayjs(params.row.course.courseDate).format("DD/MM/YYYY")}`,
    },
    {
      field: "expiry",
      headerName: "Course Expiry",
      description: "The date of when the course expires",
      width: 150,
      valueGetter: (params) =>
        `${dayjs(params.row.course.expiry).format("DD/MM/YYYY")}`,
    },
    {
      field: "expiresDays",
      headerName: "Expires in",
      description: "The number of days in which the certificate will expire",
      width: 150,
      valueGetter: getDaysTillExpiry,
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
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<PictureAsPdfIcon sx={{ color: "#2c8535" }} />}
          label="pdf"
          onClick={() => handleConfirmOpenPDF(params)}
        />,
        <GridActionsCellItem
          icon={<AcUnitIcon sx={{ color: "#229ee6" }} />}
          label="Freeze"
          onClick={() => handleConfirmFreezeUnfreeze(params)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon sx={{ color: "#d44848" }} />}
          label="Delete"
          onClick={() => handleConfirmDelete(params)}
        />,
      ],
    },
  ];

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
              {isSuccess && (
                <DataGrid
                  loading={isLoading}
                  rows={data}
                  getRowId={(row) => row.id}
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
              )}
            </Box>
            {/* Table End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
