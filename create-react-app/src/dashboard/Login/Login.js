import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField, Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../providers/Auth.context";
import { useNavigate } from "react-router-dom";
import { useLoginEmployeeMutation } from "../../api/services/login";
import { SharedSnackbarContext } from "../../providers/SharedSnackbar.context";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Qardless "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

const validationSchemaLoginUser = yup.object({
  email: yup.string().required("Please enter your email address").email(),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [loginEmployee, result] = useLoginEmployeeMutation();

  const snackBarContext = React.useContext(SharedSnackbarContext);

  React.useEffect(() => {
    if (result.isError == true) {
      snackBarContext.openSnackbar(
        `Login failed for ${result.originalArgs.email}, please try again!`
      );
    }

    if (result.isSuccess == true) {
      setUser(result.data);

      snackBarContext.openSnackbar(`Welcome ${result.originalArgs.email}!`);

      console.log(user);

      navigate("/dashboard");
    }
  }, [result.isSuccess, result.isError]);

  const formikLoginUser = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaLoginUser,
    onSubmit: async (values) => {
      const loginUserPayload = {
        email: values.email,
        password: values.password,
      };

      loginEmployee(loginUserPayload)
        .unwrap()
        .then((result) => console.log("fulfilled", result))
        .catch((error) => console.error("rejected", error));
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent={"center"} spacing={2}>
        <Grid item xs={10} sm={6} md={5} lg={4}>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              padding: "24px",
            }}
          >
            <Avatar
              src="qardless_logo.png"
              sx={{ width: 250, height: 250, mb: 2 }}
            />
            <Typography variant="h4">Login</Typography>
          </Stack>

          <form onSubmit={formikLoginUser.handleSubmit}>
            <Stack spacing={2}>
              <TextField
                variant="filled"
                fullWidth
                id="email"
                type="email"
                name="email"
                label="Enter email address"
                value={formikLoginUser.values.email}
                onChange={formikLoginUser.handleChange}
                error={
                  formikLoginUser.touched.email &&
                  Boolean(formikLoginUser.errors.email)
                }
                helperText={
                  formikLoginUser.touched.email && formikLoginUser.errors.email
                }
              />

              <TextField
                autoComplete="off"
                variant="filled"
                fullWidth
                id="password"
                type="password"
                name="password"
                label="Enter password"
                value={formikLoginUser.values.password}
                onChange={formikLoginUser.handleChange}
                error={
                  formikLoginUser.touched.password &&
                  Boolean(formikLoginUser.errors.password)
                }
                helperText={
                  formikLoginUser.touched.password &&
                  formikLoginUser.errors.password
                }
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                color="primary"
                variant="contained"
                fullWidth
                disabled={result.isLoading}
                type="submit"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>

      <pre>{JSON.stringify(result, null, 2)}</pre>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}
