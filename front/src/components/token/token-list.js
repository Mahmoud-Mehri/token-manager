import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Collapse,
} from "@mui/material";
import TokenCard from "./token-card";
import {
  getTokenList,
  getTokenListError,
  getTokenListLoading,
  getTokenListMessage,
} from "../../logic/selectors/token-selectors";
import { tokenListRequest } from "../../logic/thunks/token-thunk";

const TokenList = ({
  loading,
  tokens,
  error,
  message,
  loadTokenList,
  refreshList,
  setRefreshList,
  setTokenInfo,
  setOpenDetail,
  ...props
}) => {
  useEffect(() => {
    console.log("RL-USEEFFECT");
    if (refreshList === true) {
      console.log("Before Load");
      loadTokenList();
      setRefreshList(false);
    }
  }, [refreshList]);

  const [selectedId, setSelectedId] = useState(-1);
  const setSelected = (id) => {
    setSelectedId(id);
    setTokenInfo(
      tokens.find((token, idx, arr) => {
        if (token.id == id) return token;
      })
    );

    if (id > -1) {
      setOpenDetail(true);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color={error ? "red" : "colorSecondary"}>
          {error ? "Error: " : ""} {message}
        </Typography>
      ) : (
        <Grid container spacing={1}>
          {tokens.map((token) => (
            <Grid item key={token.id} lg={2} md={2} xs={2}>
              <TokenCard
                tokenInfo={{ ...token }}
                selected={token.id == selectedId ? true : false}
                setSelectedId={setSelected}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: getTokenListLoading(state),
  tokens: getTokenList(state),
  error: getTokenListError(state),
  message: getTokenListMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadTokenList: (data) => dispatch(tokenListRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TokenList);
