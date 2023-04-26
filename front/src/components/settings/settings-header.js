import React, { useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";

export const SettingsHeader = ({ ...props }) => {
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
          Settings
        </Typography>
      </Box>
      <Divider
        sx={{
          margin: 2,
        }}
      />
    </Box>
  );
};
