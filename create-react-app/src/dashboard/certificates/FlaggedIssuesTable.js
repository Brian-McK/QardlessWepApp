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
import VisibilityIcon from "@mui/icons-material/Visibility";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import {
  useFreezeCertificateMutation,
  useUnfreezeCertificateMutation,
} from "../../api/services/certificates";
import { useGetFlaggedIssuesByBusinessIdQuery } from "../../api/services/flaggedIssues";
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

export default function FlaggedIssuesTable() {
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
    refetch
  } = useGetFlaggedIssuesByBusinessIdQuery(user.businessId);

  const [freezeCertificate, freezeResponse] = useFreezeCertificateMutation();

  const [unfreezeCertificate, unfreezeResponse] =
    useUnfreezeCertificateMutation();

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
      title: params.row.certificate.isFrozen
        ? `Certificate ${params.row.certificate.certNumber} status: Frozen`
        : `Certificate ${params.row.certificate.certNumber} status: Active`,
      message: params.row.certificate.isFrozen
        ? `Would you like to unfreeze certificate ${params.row.certificate.certNumber}?`
        : `Would you like to freeze certificate ${params.row.certificate.certNumber}?`,
    });
    if (confirmed) {
      params.row.certificate.isFrozen
        ? unfreezeCertificate(params.row.certificate.id).then(refetch())
        : freezeCertificate(params.row.certificate.id).then(refetch);
    }
  };

  //   [
  //     {
  //       "id": "4e1cbb46-a1bc-497e-a2da-a546b4b6cb91",
  //       "type": "Certificate",
  //       "content": "Brian Test Report Issue",                          *** action - view issue open modal
  //       "wasRead": false,                                              *** 4
  //       "createdAt": "2023-04-26T13:30:39.567247",                     *** 3
  //       "certificateId": "f2a99b15-c29c-471f-bb27-2fc103a91f30",
  //       "certificate": {
  //         "id": "f2a99b15-c29c-471f-bb27-2fc103a91f30",
  //         "courseId": "36e48a72-91f3-451a-c0e5-08db464c5890",
  //         "course": {
  //           "id": "36e48a72-91f3-451a-c0e5-08db464c5890",
  //           "businessId": "798f735b-f5d3-4e9c-ef37-08db46495f57",
  //           "business": null,
  //           "title": "Manual Handling",                                *** 2
  //           "courseDate": "2023-04-26T00:00:00",
  //           "expiry": "2024-04-26T00:00:00"
  //         },
  //         "endUserId": "d4bb3ba9-6d92-41aa-7c1b-08db464e8ba1",         *** action - make api call to get more of the user information
  //         "certNumber": "908767",                                      *** 1
  //         "pdfUrl": "https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf", ***
  //         "createdAt": "2023-04-26T13:08:46.463846",
  //         "isFrozen": false                                            *** 5 - with an action to freeze?
  //       }
  //     }
  //   ]

  const dataGridDataCols = [
    {
      field: "certNumber",
      headerName: "Cert Number",
      description: "The certificate number",
      width: 150,
      valueGetter: (params) => `${params.row.certificate.certNumber}`,
    },
    {
      field: "title",
      headerName: "Course Title",
      description: "The title of the course",
      width: 200,
      valueGetter: (params) => `${params.row.certificate.course.title}`,
    },
    {
      field: "createdDate",
      headerName: "Flagged Date",
      description: "The date of when the issue was flagged",
      width: 150,
      valueGetter: (params) =>
        `${dayjs(params.row.createdAt).format("DD/MM/YYYY")}`,
    },
    {
      field: "wasRead",
      headerName: "Was Read",
      description: "Shows wether the issue was read",
      width: 100,
      valueGetter: (params) => {
        if (params.row.wasRead) {
          return `Yes`;
        }
        return `No`;
      },
    },
    {
      field: "isFrozen",
      headerName: "Status",
      description: "Shows wether the certificate is active or frozen",
      width: 100,
      valueGetter: (params) => {
        if (params.row.certificate.isFrozen) {
          return `Frozen`;
        }
        return `Active`;
      },
    },
    {
      field: "actions",
      description: "Read content of issue / freeze or unfreeze certificate",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon sx={{ color: "#2c8535" }} />}
          label="view"
          onClick={() => handleConfirmOpenPDF(params)}
        />,
        <GridActionsCellItem
          icon={<AcUnitIcon sx={{ color: "#229ee6" }} />}
          label="Freeze"
          onClick={() => handleConfirmFreezeUnfreeze(params)}
        />,
      ],
    },
  ];

  //   const dataGridDataCols = [
  //     {
  //       field: "certNumber",
  //       headerName: "Cert Number",
  //       description: "The certificate number",
  //       width: 150,
  //     },
  //     {
  //       field: "title",
  //       headerName: "Course Title",
  //       description: "The title of the course",
  //       width: 200,
  //       valueGetter: (params) => `${params.row.course.title}`,
  //     },
  //     {
  //       field: "courseDate",
  //       headerName: "Course Date",
  //       description: "The date of when the course was held",
  //       width: 150,
  //       valueGetter: (params) =>
  //         `${dayjs(params.row.course.courseDate).format("DD/MM/YYYY")}`,
  //     },
  //     {
  //       field: "expiry",
  //       headerName: "Course Expiry",
  //       description: "The date of when the course expires",
  //       width: 150,
  //       valueGetter: (params) =>
  //         `${dayjs(params.row.course.expiry).format("DD/MM/YYYY")}`,
  //     },
  //     {
  //       field: "expiresDays",
  //       headerName: "Expires in",
  //       description: "The number of days in which the certificate will expire",
  //       width: 150,
  //       valueGetter: getDaysTillExpiry,
  //     },
  //     {
  //       field: "isFrozen",
  //       headerName: "Status",
  //       description: "Shows wether the certificate is active or frozen",
  //       width: 100,
  //       valueGetter: (params) => {
  //         if (params.row.isFrozen) {
  //           return `Frozen`;
  //         }
  //         return `Active`;
  //       },
  //     },
  //     {
  //       field: "actions",
  //       description: "Delete / toggle freeze, unfreeze certificates",
  //       type: "actions",
  //       headerName: "Actions",
  //       width: 100,
  //       getActions: (params) => [
  //         <GridActionsCellItem
  //           icon={<PictureAsPdfIcon sx={{ color: "#2c8535" }} />}
  //           label="pdf"
  //           onClick={() => handleConfirmOpenPDF(params)}
  //         />,
  //         <GridActionsCellItem
  //           icon={<AcUnitIcon sx={{ color: "#229ee6" }} />}
  //           label="Freeze"
  //           onClick={() => handleConfirmFreezeUnfreeze(params)}
  //         />,
  //         <GridActionsCellItem
  //           icon={<DeleteIcon sx={{ color: "#d44848" }} />}
  //           label="Delete"
  //           onClick={() => handleConfirmDelete(params)}
  //         />,
  //       ],
  //     },
  //   ];

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
            <h4>Flagged Issues</h4>
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
