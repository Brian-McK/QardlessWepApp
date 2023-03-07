import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllCoursesByBusinessIdQuery } from "../../api/services/courses";

export default function CoursesTable() {
  // "businessId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",

  const {
    data = [],
    error,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllCoursesByBusinessIdQuery("358c4557-c65c-4c76-49d7-08db1a8071a9");

  const dataGridDataCols = [
    { field: "id", headerName: "Id", width: 150 },
    {
      field: "title",
      headerName: "Course Title",
      width: 250,
    },
    {
      field: "courseDate",
      headerName: "Course Date",
      width: 150,
    },
    {
      field: "expiry",
      headerName: "Course Expiry",
      width: 150,
    },
  ];

  React.useEffect(() => {}, [data]);

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} md={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>Courses Table</h4>
            {/* Table Start */}
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                loading={isLoading}
                rows={data}
                columns={dataGridDataCols}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
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
