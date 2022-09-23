import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Assignment as EmptyIcon } from "@mui/icons-material/Assignment";
import { Settings as ManageIcon } from "@mui/icons-material/Settings";

export const TokenCard = ({ token, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        {!!token.icon ? (
          <Avatar alt="Product" src={token.icon} variant="square" />
        ) : (
          <EmptyIcon color="action" />
        )}
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {token.title}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {token.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <EmptyIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <ManageIcon />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Manage Token
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

TokenCard.propTypes = {
  token: PropTypes.object.isRequired,
};
