import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import { DashboardHeader } from "../components/dashboard/dashboard-header";

const Dashboard = ({ ...props }) => (
  <>
    <title>Dashboard - Token Manager</title>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 1,
      }}
    >
      <DashboardHeader />
    </Box>
  </>
);

export default Dashboard;
