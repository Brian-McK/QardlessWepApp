import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridCsvExportOptions,
} from "@mui/x-data-grid";
import { useGetAllCoursesByBusinessIdQuery } from "../../api/services/courses";
import dayjs from "dayjs";
import { useAuth } from "../../providers/Auth.context";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

export default function CoursesTable() {

  const { user } = useAuth();

  console.log(user);

  const {
    data = [],
    error,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllCoursesByBusinessIdQuery(user.businessId);

  const dataGridDataCols = [
    {
      field: "title",
      headerName: "Course Title",
      description: "The title of the course",
      width: 250,
    },
    {
      field: "courseDate",
      headerName: "Course Date",
      description: "The date of when the course was held",
      width: 150,
      valueGetter: (params) =>
        `${dayjs(params.row.courseDate).format("DD/MM/YYYY")}`
    },
    {
      field: "expiry",
      headerName: "Course Expiry",
      description: "The date of when the course expires",
      width: 150,
      valueGetter: (params) =>
        `${dayjs(params.row.expiry).format("DD/MM/YYYY")}`
    },
  ];

  React.useEffect(() => {
    console.log(data);
  }, [data]);

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
            <h4>Courses</h4>
            {/* Table Start */}
            <Box sx={{ height: 400, width: "100%" }}>
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
