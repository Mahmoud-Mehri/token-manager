import React from "react";
import { connect } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import { TokenCard } from "../components/token/token-card";
import NewToken from "../components/token/token-new";
import { TokensHeader } from "../components/token/tokens-header";
import { DashboardLayout } from "../components/dashboard-layout";
import {
  getTokenList,
  getTokenListError,
  getTokenListLoading,
  getTokenListMessage,
} from "../logic/selectors/token-selectors";
import { tokenListRequest } from "../logic/thunks/token-thunk";

const Tokens = ({
  loading,
  tokens,
  error,
  message,
  loadTokenList,
  ...props
}) => {
  if (loading) return <p1>Loading ...</p1>;
  if (error) return <pre>{JSON.stringify(error, 2, null)}</pre>;
  return (
    <>
      <title>Tokens - Token Manager</title>
      <Box
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth={false}>
          <TokensHeader />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {tokens.map((token) => (
                <Grid item key={token.id} lg={4} md={6} xs={12}>
                  <TokenCard token={token} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          ></Box>
        </Container>
      </Box>
    </>
  );
};

Tokens.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = (state) => ({
  loading: getTokenListLoading(state),
  tokens: getTokenList(state),
  error: getTokenListError(state),
  message: getTokenListMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadTokenList: (data) => dispatch(tokenListRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tokens);
