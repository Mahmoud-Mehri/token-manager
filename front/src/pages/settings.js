import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { SettingsPassword } from "../components/settings/settings-password";
import { SettingsHeader } from "../components/settings/settings-header";

const Settings = ({ ...props }) => (
  <>
    <title>Settings - Token Manager</title>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 1,
      }}
    >
      <SettingsHeader />
      <SettingsPassword />
    </Box>
  </>
);

export default Settings;
