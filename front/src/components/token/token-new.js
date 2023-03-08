import React from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  MenuItem,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  getCreatedToken,
  getCreateTokenError,
  getCreateTokenMessage,
  getCreateTokenProgress,
} from "../../logic/selectors/token-selectors";
import { createTokenRequest } from "../../logic/thunks/token-thunk";

const NewToken = ({
  inProgress,
  token,
  error,
  message,
  createNewToken,
  ...props
}) => {
  const formik = useFormik({
    initialValues: {
      type: 1,
      title: "",
      name: "",
      symbol: "",
      icon: "",
      media: "",
      description: "",
    },
    validationSchema: Yup.object({
      type: Yup.number().min(1).max(2).required("Token Type is required"),
      title: Yup.string().max(100).required("Title is required"),
      name: Yup.string().max(20).required("Name is required"),
      symbol: Yup.string().max(4).required("Symbol in required"),
      icon: Yup.string().url("Icon file url is not valid").notRequired(),
      media: Yup.string().url("Media Url is not valid"),
      description: Yup.string().notRequired(),
    }),
    onSubmit: async () => {
      const data = {
        type: formik.values.type,
        title: formik.values.title,
        name: formik.values.name,
        symbol: formik.values.symbol,
        icon: formik.values.icon,
        media: formik.values.media,
        description: formik.values.description,
      };

      await createNewToken(data);
    },
  });

  const Progress = inProgress ? <CircularProgress /> : null;
  const Message = (
    <Typography color={error ? "red" : "colorSecondary"}>
      {error ? "Error: " : ""} {message}
    </Typography>
  );

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          select
          name="type"
          label="Token Type"
          fullWidth
          size="small"
          margin="dense"
          value={formik.values.type}
          onChange={formik.handleChange}
        >
          <MenuItem value={1}>Fungible Token</MenuItem>
          <MenuItem value={2}>Non-Fungible Token</MenuItem>
        </TextField>
        <TextField
          type="text"
          name="title"
          label="Token Title"
          value={formik.values.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.title && formik.errors.title)}
          fullWidth
          size="small"
          variant="outlined"
          margin="dense"
        ></TextField>
        <TextField
          type="text"
          name="name"
          label="Token Name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.name && formik.errors.name)}
          fullWidth
          size="small"
          variant="outlined"
          margin="dense"
        ></TextField>
        <TextField
          type="text"
          name="symbol"
          label="Token Symbol"
          value={formik.values.symbol}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.symbol && formik.errors.symbol)}
          fullWidth
          size="small"
          variant="outlined"
          margin="dense"
        ></TextField>
        <TextField
          type="url"
          name="icon"
          label="Token Icon"
          value={formik.values.icon}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.icon && formik.errors.icon)}
          helperText={formik.touched.icon && formik.errors.icon}
          fullWidth
          size="small"
          variant="outlined"
          margin="dense"
        ></TextField>
        <TextField
          type="url"
          name="media"
          label="Token Media"
          value={formik.values.media}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.media && formik.errors.media)}
          helperText={formik.touched.media && formik.errors.media}
          fullWidth
          size="small"
          variant="outlined"
          margin="dense"
        ></TextField>
        <TextField
          type="text"
          name="description"
          label="Token Description"
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.description && formik.errors.description
          )}
          helperText={formik.touched.description && formik.errors.description}
          fullWidth
          size="small"
          variant="outlined"
          margin="dense"
        ></TextField>
        <Box display="flex" justifyContent="space-between" padding={1}>
          <Box>{inProgress ? Progress : Message}</Box>
          <Button color="primary" type="submit" variant="contained">
            Create Token
          </Button>
        </Box>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  inProgress: getCreateTokenProgress(state),
  token: getCreatedToken(state),
  error: getCreateTokenError(state),
  message: getCreateTokenMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  createNewToken: (data) => dispatch(createTokenRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewToken);
