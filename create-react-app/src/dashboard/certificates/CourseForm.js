import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFormik, Form, Field } from "formik";
import * as yup from "yup";
import { TextField, Button, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const today = dayjs();
const tomorrow = dayjs().add(1, "day");

const validationSchemaAddCourse = yup.object({
  courseTitle: yup
    .string("Enter course title")
    .required("Course title is required"),
});

export default function CourseForm() {
  const formikAddCourse = useFormik({
    initialValues: {
      courseTitle: "",
      startDate: today,
    },
    validationSchema: validationSchemaAddCourse,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5} lg={5}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack spacing={2}>
              <h4>Add Course</h4>
              {/* Form Start */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={formikAddCourse.handleSubmit}>
                  <TextField
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
                    minDate={today}
                    views={["year", "month", "day"]}
                    value={formikAddCourse.values.startDate}
                    onChange={(value) =>
                      formikAddCourse.setFieldValue("startDate", value)
                    }
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
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
                </form>
              </LocalizationProvider>
              {/* Form End */}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={1} lg={1}>
          <h3>Or</h3>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack spacing={2}>
              <h4>Select Exisiting Course</h4>
              {/* Form Start */}
              {/* Form End */}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
