import React, { useEffect, useState } from "react";
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
  const [newTokenStarted, setNewTokenStarted] = useState(false);
  const [newTokenSucceed, setNewTokenSucceed] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedTokenInfo, setSelectedTokenInfo] = useState({});
  const [refreshList, setRefreshList] = useState(true);

  useEffect(() => {
    if (newTokenSucceed === true) {
      setRefreshList(true);
    }
  }, [newTokenSucceed]);

  return (
    <>
      <title>Tokens - Token Manager</title>
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
        }}
      >
        <TokensHeader
          newToken={newToken}
          setNewToken={setNewToken}
          setNewTokenStarted={setNewTokenStarted}
          setNewTokenSucceed={setNewTokenSucceed}
        />
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
            <NewToken
              newToken={newToken}
              setNewToken={setNewToken}
              newTokenStarted={newTokenStarted}
              setNewTokenStarted={setNewTokenStarted}
              setNewTokenSucceed={setNewTokenSucceed}
            />
          </DialogContent>
        </Dialog>
        <TokenList
          refreshList={refreshList}
          setRefreshList={setRefreshList}
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
