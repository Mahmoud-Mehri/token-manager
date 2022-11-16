import React from "react";
import { Box, Collapse } from "@mui/material";
import { Close } from "@mui/icons-material";
import NewToken from "../components/token/token-new";
import { TokensHeader } from "../components/token/tokens-header";
import TokenList from "../components/token/token-list";

const Tokens = ({ ...props }) => {
  const [newToken, setNewToken] = useState(false);

  return (
    <>
      <title>Tokens - Token Manager</title>
      <Box
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <TokensHeader />
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
              <NewToken />
            </Box>
          </Box>
        </Collapse>
        <TokenList />
      </Box>
    </>
  );
};

export default Tokens;
