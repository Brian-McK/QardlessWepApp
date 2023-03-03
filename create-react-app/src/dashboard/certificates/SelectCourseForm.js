import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormikContext } from "formik";
import { TextField } from "@mui/material";

let dummyCourseItems = [
  {
    id: 1,
    courseTitle: "Forklift training",
  },
  {
    id: 2,
    courseTitle: "Manuel handling",
  },
  {
    id: 3,
    courseTitle: "Food safety training",
  },
];

export default function SelectCourseForm() {
  const { handleChange, values, errors, touched } = useFormikContext();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>Select Exisiting Course</h4>
            {/* Form Start */}

            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel id="select-course">Course Title</InputLabel>
              <Select
                labelId="select-course"
                id="selectCourse"
                value={values.selectCourse}
                onChange={handleChange}
                renderValue={(params) => (
                  <TextField variant="filled" fullWidth {...params} />
                )}
                
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {dummyCourseItems.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.courseTitle}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* Form End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
