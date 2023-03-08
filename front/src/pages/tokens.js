import React, { useState } from "react";
import {
  Box,
  Collapse,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import NewToken from "../components/token/token-new";
import { TokensHeader } from "../components/token/tokens-header";
import TokenList from "../components/token/token-list";
import TokenDetail from "../components/token/token-detail";

const Tokens = ({ ...props }) => {
  const [newToken, setNewToken] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedTokenInfo, setSelectedTokenInfo] = useState({});

  return (
    <>
      <title>Tokens - Token Manager</title>
      <Box
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <TokensHeader newToken={newToken} setNewToken={setNewToken} />
        <Dialog open={newToken}>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" marginBottom={1}>
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
          </DialogTitle>
          <DialogContent>
            <NewToken />
          </DialogContent>
        </Dialog>
        <TokenList
          setOpenDetail={setOpenDetail}
          setTokenInfo={setSelectedTokenInfo}
        />
        {selectedTokenInfo != null && openDetail == true ? (
          <TokenDetail
            tokenInfo={selectedTokenInfo}
            openDetail={openDetail}
            setOpenDetail={setOpenDetail}
          />
        ) : null}
      </Box>
    </>
  );
};

export default Tokens;
