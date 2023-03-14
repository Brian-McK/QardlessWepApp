import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField, Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

      console.log(loginUserPayload);

      loginUser(loginUserPayload);
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
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}
