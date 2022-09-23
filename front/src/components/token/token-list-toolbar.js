import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import NewToken from "./token-new";

export const TokenListToolbar = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
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
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Create Token
          </Button>
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Create New Token</DialogTitle>
        <DialogContent>
          <NewToken />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
