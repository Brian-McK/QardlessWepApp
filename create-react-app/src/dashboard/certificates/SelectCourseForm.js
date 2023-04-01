import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { useFormikContext } from "formik";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

export default function SelectCourseForm({ courses }) {
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

                {courses.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {`${item.title}`}
                      <Typography
                        variant="caption"
                        sx={{mx: 1}}
                      >
                        {`Starts: ${dayjs(item.courseDate).format(
                          "DD/MM/YYYY"
                        )} `}
                        {`Expires: ${dayjs(item.expiry).format(
                          "DD/MM/YYYY"
                        )} `}
                      </Typography>
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
