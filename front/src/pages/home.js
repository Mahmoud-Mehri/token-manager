import React, { useState } from "react";
import { Button, Container, Typography, IconButton, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { theme } from "../theme";
import Register from "./register";
import Login from "./login";
import Close from "@mui/icons-material/Close";

export const Home = ({ setAuthInfo, ...props }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpenLogin(false);
  };

  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = (event, reason) => {
    if (reason && reason === "backdropClick") return;

    setOpenRegister(false);
  };

  return (
    <Container
      sx={{
        bgcolor: theme.palette.primary.dark,
        borderColor: "#23453D",
        borderRadius: 2,
        width: 800,
        height: 200,
        display: "flex",
        alignContent: "space-between",
        padding: 2,
      }}
    >
      <Grid container spacing={1}>
        <Grid
          xs={12}
          sx={{
            alignContent: "center",
          }}
        >
          <Typography color="white" variant="h4">
            Token Manager
          </Typography>
          <Typography
            color={theme.palette.text.secondary}
            variant="h7"
            sx={{
              fontFamily: "monospace",
              marginLeft: 1,
            }}
          >
            Create and Manage your ERC Tokens
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sx={{
            display: "flow",
            alignContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button onClick={handleOpenRegister}>Register</Button>
          <Button onClick={handleOpenLogin}>Login</Button>
        </Grid>
      </Grid>

      {/* Login Dialog */}
      <Dialog open={openLogin} onClose={handleCloseLogin}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Login to your account</h2>
          <IconButton
            sx={{
              bgcolor: "ActiveBorder",
              alignContent: "stretch",
            }}
            onClick={handleCloseLogin}
          >
            <Close
              sx={{
                color: "white",
                ":hover": {
                  color: "black",
                },
              }}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Login dialog setAuthInfo={setAuthInfo} />
        </DialogContent>
      </Dialog>
      {/* Register Dialog */}
      <Dialog open={openRegister} onClose={handleCloseRegister}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Crete New Account</h2>
          <IconButton
            sx={{
              bgcolor: "ActiveBorder",
              alignContent: "stretch",
            }}
            onClick={handleCloseRegister}
          >
            <Close
              sx={{
                color: "white",
                ":hover": {
                  color: "black",
                },
              }}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Register dialog />
        </DialogContent>
      </Dialog>
    </Container>
  );
};
