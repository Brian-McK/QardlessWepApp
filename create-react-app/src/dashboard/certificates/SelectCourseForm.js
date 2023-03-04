import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormikContext } from "formik";
import { FormHelperText, TextField } from "@mui/material";

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
              <TextField
                select
                variant="filled"
                id="selectCourse"
                name="selectCourse"
                label="Select Course"
                value={values.selectCourse}
                onChange={handleChange}
                error={touched.selectCourse && Boolean(errors.selectCourse)}
                helperText={touched.selectCourse && errors.selectCourse}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {dummyCourseItems.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.courseTitle}>
                      {item.courseTitle}
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>

            {/* Form End */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
