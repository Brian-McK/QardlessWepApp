import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useFormik, Form, Field } from "formik";
import * as yup from "yup";
import { TextField, Button, Stack, Divider } from "@mui/material";
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
  startDate: yup.date().required("Date is required"),
});

export default function CourseForm() {
  const formikAddCourse = useFormik({
    initialValues: {
      courseTitle: "",
      startDate: today,
      expiryDate: today.add(1, 'year'),
    },
    validationSchema: validationSchemaAddCourse,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={5}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack>
              <h4>Add Course</h4>
              {/* Form Start */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={formikAddCourse.handleSubmit}>
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
                      <TextField variant="filled" fullWidth {...params} />
                    )}
                  />

                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="Course Expiry Date"
                    views={["year", "month", "day"]}
                    value={formikAddCourse.values.expiryDate}
                    onChange={(value) =>
                      formikAddCourse.setFieldValue("expiryDate", value)
                    }
                    renderInput={(params) => (
                      <TextField variant="filled" fullWidth {...params} />
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
          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <h3>Or</h3>
          </Stack>
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
