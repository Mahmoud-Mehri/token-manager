import React from "react";
import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { Assignment as EmptyIcon } from "@mui/icons-material";
import { Settings as ManageIcon } from "@mui/icons-material";
import Close from "@mui/icons-material/Close";

import TokenDetail from "./token-detail";

const TokenCard = ({ tokenInfo, selected, setSelectedId, ...rest }) => {
  console.log(`Token: ${JSON.stringify(tokenInfo)}`);

  return (
    <Box>
      <Card
        sx={{
          background: selected ? "#80CBC4" : "#E1F5FE",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        onClick={() => {
          setSelectedId(tokenInfo.id);
        }}
      >
        <CardActionArea>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 1,
              }}
            >
              {!!tokenInfo.icon ? (
                <Avatar alt="Product" src={tokenInfo.icon} variant="square" />
              ) : (
                <EmptyIcon color="action" variant="square" />
              )}
            </Box>
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              // variant="h5"
              fontSize={12}
              fontStyle={"bold"}
            >
              {tokenInfo.title}
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              // variant="body1"
              fontSize={10}
            >
              {tokenInfo.description}
            </Typography>
          </CardContent>
          <Box />
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default TokenCard;
