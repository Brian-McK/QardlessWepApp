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
import { SharedSnackbarContext } from "../../providers/SharedSnackbar.context";
import { useAddCourseMutation } from "../../api/services/courses";
import { useAuth } from "../../providers/Auth.context";

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
  const [addCourse, { data, isError, isLoading, isSuccess }] =
    useAddCourseMutation();

  const snackBarContext = React.useContext(SharedSnackbarContext);

  const { user } = useAuth();

  // reset form if successfull, display snackbar is successful or not
  React.useEffect(() => {
    formikAddCourse.resetForm();

    if (isSuccess == true) {
      snackBarContext.openSnackbar(`Course ${data.title} added!`);
    }

    if (isError == true) {
      snackBarContext.openSnackbar("Error Adding Course!");
    }
  }, [isSuccess, isError]);

  const formikAddCourse = useFormik({
    initialValues: {
      courseTitle: "",
      startDate: today,
      expiryDate: today.add(1, "year"),
    },
    validationSchema: validationSchemaAddCourse,
    onSubmit: async (values) => {
      const addCoursePayload = {
        businessId: user.businessId,
        title: values.courseTitle,
        courseDate: `${values.startDate.format("DD/MM/YYYY")}`,
        expiry: `${values.expiryDate.format("DD/MM/YYYY")}`,
      };

      addCourse(addCoursePayload);
    },
  });
  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid item xs={12}>
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
                  disabled={isLoading}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </LocalizationProvider>
          {/* Form End */}
        </Paper>
      </Grid>
    </Grid>
  );
}
