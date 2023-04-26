import React from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getCreatedDeploy,
  getCreateDeployError,
  getCreateDeployMessage,
  getCreateDeployProgress,
} from "../../logic/selectors/deploy-selectors";
import { createDeployRequest } from "../../logic/thunks/deploy-thunk";
import { MenuItem, TextField } from "@mui/material";

const NewDeploy = ({
  inProgress,
  deployInfo,
  error,
  message,
  deployToken,
  tokens,
  accounts,
  servers,
  ...props
}) => {
  const formik = useFormik({
    initialValues: {
      tokenId: 0,
      accountId: 0,
      serverId: 0,
    },
    validationSchema: Yup.object({
      tokenId: Yup.number().min(1).required("There is no Token selected"),
      accountId: Yup.number().min(1).required("There is no Account selected"),
      serverId: Yup.number().min(1).required("There is no Server selected"),
    }),
    onSubmit: () => {
      const data = {
        tokenId: formik.values.tokenId,
        accountId: formik.values.accountId,
        serverId: formik.values.serverId,
      };

      deployToken(data);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          select
          name="tokenId"
          label="Token"
          fullWidth
          size="small"
          margin="dense"
          value={formik.values.tokenId}
          onChange={formik.handleChange}
        >
          {tokens.map((token, index, arr) => {
            return <MenuItem value={token.id}>{token.title}</MenuItem>;
          })}
        </TextField>
        <TextField
          select
          name="accountId"
          label="Account"
          fullWidth
          size="small"
          margin="dense"
          value={formik.values.accountId}
          onChange={formik.handleChange}
        >
          {accounts.map((acc, index, arr) => (
            <MenuItem>{`${acc.address.substring(0, 4)} - ${
              acc.title
            }`}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          name="serverId"
          label="Server"
          fullWidth
          size="small"
          margin="dense"
          value={formik.values.accountId}
          onChange={formik.handleChange}
        >
          {servers.map((server, index, arr) => (
            <MenuItem>{`${server.title}`}</MenuItem>
          ))}
        </TextField>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  inProgress: getCreateDeployProgress(state),
  deployInfo: getCreatedDeploy(state),
  error: getCreateDeployError(state),
  message: getCreateDeployMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  deployToken: (data) => dispatch(createDeployRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDeploy);
