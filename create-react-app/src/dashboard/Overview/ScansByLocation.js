import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridCsvExportOptions,
} from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";

function DataGridTitle() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px",
      }}
    >
      <Typography
        sx={{ color: "#474747", fontWeight: "bold" }}
        variant="caption"
      >
        Top scan locations
      </Typography>
    </Box>
  );
}

export default function ScansByLocation() {
  const dummyScanLocationData = {
    Carlow: 13,
    Cavan: 34,
    Clare: 21,
    Cork: 67,
    Donegal: 21,
    Dublin: 101,
    Galway: 62,
    Kerry: 29,
    Kildare: 56,
    Kilkenny: 42,
    Laois: 13,
    Leitrim: 41,
    Limerick: 19,
    Longford: 33,
    Louth: 87,
    Mayo: 50,
    Meath: 81,
    Monaghan: 39,
    Offaly: 11,
    Roscommon: 14,
    Sligo: 20,
    Tipperary: 48,
    Waterford: 53,
    Westmeath: 70,
    Wexford: 81,
    Wicklow: 58,
  };

  const countyDataArray = Object.entries(dummyScanLocationData).map(
    ([county, scans]) => ({ county, scans })
  );

  const dataGridDataCols = [
    {
      field: "county",
      headerName: "County",
      description: "The county",
      flex: 1,
    },
    {
      field: "scans",
      headerName: "Scans",
      description: "The number of scans for the county",
      flex: 1,
    },
  ];

  //   const labels = Object.keys(courseCounts);

  //   const values = Object.values(courseCounts);

  return (
    <>
      <DataGrid
        rowHeight={25}
        disableExtendRowFullWidth={true}
        rows={countyDataArray}
        columns={dataGridDataCols}
        getRowId={(row) => row.county + row.scans}
        hideFooterPagination
        hideFooterSelectedRowCount
        hideFooter
        disableSelectionOnClick
        components={{ Toolbar: DataGridTitle }}
        sx={{
          width: "100%",
        }}
      />
    </>
  );
}
