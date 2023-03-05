import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { SharedSnackbarConsumer } from "../../providers/SharedSnackbar.context";

const today = dayjs();
const yesterday = today.subtract(1, "day");

const validationSchemaAddCourse = yup.object({
  courseTitle: yup
    .string("Enter course title")
    .required("Course title is required"),
  startDate: yup.date().nonNullable().typeError("Invalid Date"),
  expiryDate: yup.date().nonNullable().typeError("Invalid Date"),
});

export default function AddCourse() {
  const formikAddCourse = useFormik({
    initialValues: {
      courseTitle: "",
      startDate: today,
      expiryDate: today.add(1, "year"),
    },
    validationSchema: validationSchemaAddCourse,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <SharedSnackbarConsumer>
      {({ openSnackbar }) => (
        <Grid container justifyContent={"center"} spacing={2}>
          <Grid item xs={10} sm={8} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h4>Add Course</h4>
              {/* Form Start */}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={formikAddCourse.handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      variant="filled"
                      fullWidth
                      id="courseTitle"
                      type="text"
                      name="courseTitle"
                      label="Course Title"
                      value={formikAddCourse.values.courseTitle}
                      onChange={formikAddCourse.handleChange}
                      error={
                        formikAddCourse.touched.courseTitle &&
                        Boolean(formikAddCourse.errors.courseTitle)
                      }
                      helperText={
                        formikAddCourse.touched.courseTitle &&
                        formikAddCourse.errors.courseTitle
                      }
                    />

                    <DatePicker
                      inputFormat="DD/MM/YYYY"
                      label="Course Start Date"
                      views={["year", "month", "day"]}
                      value={formikAddCourse.values.startDate}
                      onChange={(value) =>
                        formikAddCourse.setFieldValue("startDate", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          variant="filled"
                          fullWidth
                          {...params}
                          error={
                            formikAddCourse.touched.startDate &&
                            Boolean(formikAddCourse.errors.startDate)
                          }
                          helperText={
                            formikAddCourse.touched.startDate &&
                            formikAddCourse.errors.startDate
                          }
                        />
                      )}
                    />

                    <DatePicker
                      inputFormat="DD/MM/YYYY"
                      disablePast
                      label="Course Expiry Date"
                      views={["year", "month", "day"]}
                      value={formikAddCourse.values.expiryDate}
                      onChange={(value) =>
                        formikAddCourse.setFieldValue("expiryDate", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          variant="filled"
                          fullWidth
                          {...params}
                          error={
                            formikAddCourse.touched.expiryDate &&
                            Boolean(formikAddCourse.errors.expiryDate)
                          }
                          helperText={
                            formikAddCourse.touched.expiryDate &&
                            formikAddCourse.errors.expiryDate
                          }
                        />
                      )}
                    />

                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>

                    {JSON.stringify(formikAddCourse.values, null, 4)}
                    <br></br>
                    {JSON.stringify(formikAddCourse.errors, null, 4)}
                  </Stack>
                </form>
              </LocalizationProvider>
              {/* Form End */}
            </Paper>
          </Grid>
        </Grid>
      )}
    </SharedSnackbarConsumer>
  );
}
