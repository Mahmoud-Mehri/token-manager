import React from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { TokenListToolbar } from "../components/product/token-list-toolbar";
import { TokenCard } from "../components/product/token-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useFetch } from "../hooks/useFetch.js";

const Tokens = () => {
  const { loading, tokenList, error } = useFetch("");

  if (loading) return <p1>Loading ...</p1>;
  if (error) return <pre>{JSON.stringify(error, 2, null)}</pre>;
  return (
    <>
      <title>Tokens - Token Manager</title>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <TokenListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {tokenList.map((token) => (
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
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Tokens.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Tokens;
