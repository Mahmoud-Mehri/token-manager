import React, { useContext } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  getRegisteredUser,
  getRegisterError,
  getRegisterMessage,
  getRegisterProgress,
} from "../logic/selectors/user-selectors";
import { userRegisterRequest } from "../logic/thunks/user-thunk";

const Register = ({
  inProgress,
  user,
  error,
  message,
  onRegisterClick,
  ...props
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      const data = {
        registerInfo: {
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          email: formik.values.email,
          password: formik.values.password,
        },
        setAuthInfo: authData.setAuthInfo,
      };

      onRegisterClick(data);
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
      <title>Register</title>
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
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Create a new account
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Use your email to create a new account
                </Typography>
              </Box>
            )}

            <TextField
              error={Boolean(
                formik.touched.firstName && formik.errors.firstName
              )}
              fullWidth
              // helperText={formik.touched.firstName && formik.errors.firstName}
              label="First Name"
              margin="dense"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
              size="small"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              // helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              margin="dense"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
              size="small"
            />
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
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
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

            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <Link variant="subtitle2" underline="hover">
                Sign In
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  inProgress: getRegisterProgress(state),
  user: getRegisteredUser(state),
  error: getRegisterError(state),
  message: getRegisterMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRegisterClick: (data) => dispatch(userRegisterRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
