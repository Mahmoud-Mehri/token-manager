import React from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  getCreatedToken,
  getCreateTokenError,
  getCreateTokenMessage,
  getCreateTokenProgress,
} from "../../redux/selectors/token-selectors";
import { createTokenRequest } from "../../redux/thunks/token-thunk";
import { Box } from "@mui/system";

const NewToken = ({
  inProgress,
  token,
  error,
  message,
  createNewToken,
  ...props
}) => {
  const tokenTypes = ["FT", "NFT"];
  const formik = useFormik({
    initialValues: {
      type: tokenTypes[0],
      title: "",
      symbol: "",
      icon: "",
      media: "",
      description: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Token Type is required"),
      title: Yup.string().required("Title is required"),
      symbol: Yup.string()
        .max(4)
        .required("Symbol in required"),
      icon: Yup.string()
        .url("Icon file url is not valid")
        .notRequired(),
      media: Yup.string().url("Media Url is not valid"),
      description: Yup.string().notRequired(),
    }),
    onSubmit: () => {
      const data = {
        type: formik.values.type,
        title: formik.values.title,
        symbol: formik.values.symbol,
        icon: formik.values.icon,
        media: formik.values.media,
        description: formik.values.description,
      };

      createNewToken(data);
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
        <Select
          label="Token Type"
          fullWidth
          size="small"
          value={formik.values.type}
        >
          <MenuItem value="FT">Fungible Token</MenuItem>
          <MenuItem value="NFT">Non-Fungible Token</MenuItem>
        </Select>
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
        <Box>
          <Box>{inProgress ? Progress : Message}</Box>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              formik.resetForm();
            }}
          >
            Clear Form
          </Button>
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
