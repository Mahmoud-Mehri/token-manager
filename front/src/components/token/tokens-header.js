import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Collapse,
  Divider,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import TokenNew from "./token-new";

export const TokensHeader = (props) => {
  const [newToken, setNewToken] = useState(false);
  const handleClose = () => {
    setNewToken(false);
  };

  return (
    <Box {...props}>
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
      <Collapse in={newToken}>
        <Box
          sx={{
            borderColor: "lightgray",
            borderWidth: 0.5,
            borderStyle: "solid",
            borderRadius: 3,
          }}
        >
          <Box display="flex" justifyContent="space-between" margin={3}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">Create New token</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={() => {
                  setNewToken(false);
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              margin: 3,
            }}
          >
            <TokenNew />
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
