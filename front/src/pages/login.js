import React from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import {
  getLoginProgress,
  getLoginError,
  getLoginMessage,
  getLoggedInUser,
} from "../redux/selectors/user-selectors";
import { userLoginRequest } from "../redux/thunks/user-thunk";

const Login = ({
  inProgress,
  user,
  error,
  message,
  onLoginClicked,
  ...props
}) => {
  const fromDlg = !!props.dialog;
  console.log(`From Dialog: ${fromDlg}`);
  // const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email address is not valid")
        .max(255)
        .required("Email is required"),
      password: Yup.string()
        .max(255)
        .required("Password is required"),
    }),
    onSubmit: () => {
      const data = {
        email: formik.values.email,
        password: formik.values.password,
      };

      onLoginClicked(data);
    },
  });

  const Progress = <CircularProgress />;
  const Message = (
    <Typography color={error ? "red" : "colorSecondary"} variant="body2">
      {error ? "Error:" : ""} {message}
    </Typography>
  );

  return (
    <>
      <title>Login | Token Manager</title>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            {fromDlg ? null : (
              <>
                <Box sx={{ my: 3 }}>
                  <Typography color="textPrimary" variant="h4">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Button
                      color="info"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={formik.handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      color="error"
                      startIcon={<GoogleIcon />}
                      onClick={formik.handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3,
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
              </>
            )}
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              // helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="dense"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
              size="small"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              // helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="dense"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
              size="small"
            />
            <Box
              sx={{
                py: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>{inProgress ? Progress : Message}</Box>

              <Button
                color="primary"
                disabled={inProgress}
                size="large"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Box>
            {fromDlg ? null : (
              <Typography color="textSecondary" variant="body2">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            )}
          </form>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  inProgress: getLoginProgress(state),
  user: getLoggedInUser(state),
  error: getLoginError(state),
  message: getLoginMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoginClicked: (data) => dispatch(userLoginRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
