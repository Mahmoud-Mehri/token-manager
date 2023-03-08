import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import {
  getLoginProgress,
  getLoginError,
  getLoginMessage,
  getLoggedInUser,
} from "../logic/authentication/auth-selector";
import { userLoginRequest } from "../logic/authentication/auth-thunk";
import { useNavigate } from "react-router-dom";
import {
  useAuthDispatch,
  useAuthState,
} from "../logic/authentication/auth-context";

const Login = ({ ...props }) => {
  const navigate = useNavigate();
  const authInfo = useAuthState();
  const authDispatch = useAuthDispatch();

  const loginRequest = async (data, dispatch) => {
    await userLoginRequest(data, dispatch);
  };

  useEffect(() => {
    console.log(`Auth Info: ${JSON.stringify(authInfo)}`);
    if (authInfo.user.authenticated) navigate("/profile");
  }, [authInfo]);

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
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async () => {
      const data = {
        email: formik.values.email,
        password: formik.values.password,
      };

      await loginRequest(data, authDispatch);
    },
  });

  const Progress = <CircularProgress />;
  const Message = (
    <Typography
      color={authInfo.error ? "red" : "colorSecondary"}
      variant="body2"
    >
      {authInfo.error ? "Error:" : ""} {authInfo.message}
    </Typography>
  );

  return (
    <>
      <title>Login | Token Manager</title>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
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
              <Box>{authInfo.inProgress ? Progress : Message}</Box>

              <Button
                color="primary"
                disabled={authInfo.inProgress}
                size="large"
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
