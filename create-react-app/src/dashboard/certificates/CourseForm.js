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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const today = dayjs();
const tomorrow = dayjs().add(1, "day");

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

const validationSchemaAddCourse = yup.object({
  courseTitle: yup
    .string("Enter course title")
    .required("Course title is required"),
  startDate: yup.date().required("Date is required"),
});

export default function CourseForm() {
  const [courseSelected, setCourseSelected] = React.useState("");

  const courseHandleChange = (e) => {
    setCourseSelected(e.target.value);
  };

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
            <h4>Select Exisiting Course</h4>
            {/* Form Start */}

            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel id="select-course">Course Title</InputLabel>
              <Select
                labelId="select-course"
                id="selectCourse"
                value={courseSelected}
                onChange={courseHandleChange}
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
