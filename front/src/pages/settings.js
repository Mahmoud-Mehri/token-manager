import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { SettingsNotifications } from "../components/settings/settings-notifications";
import { SettingsPassword } from "../components/settings/settings-password";

const Settings = ({ ...props }) => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Settings
        </Typography>
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </>
);

export default Settings;
