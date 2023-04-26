import React, { useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";

export const TokensHeader = ({
  newToken,
  setNewToken,
  setNewTokenStarted,
  setNewTokenSucceed,
  ...props
}) => {
  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Tokens
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            disabled={newToken}
            onClick={() => {
              setNewTokenStarted(false);
              setNewTokenSucceed(false);
              setNewToken(true);
            }}
          >
            Create Token
          </Button>
        </Box>
      </Box>
      <Divider
        sx={{
          margin: 2,
        }}
      />
    </Box>
  );
};
