import React, { useState } from "react";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { connect } from "react-redux";

const TokenDetail = ({ tokenInfo, openDetail, setOpenDetail, ...res }) => {
  const closeDetailHandler = () => {
    setOpenDetail(false);
  };

  return (
    <Collapse in={openDetail}>
      <Box
        sx={{
          p: 1,
          m: 2,
          border: "1px solid rgba(207, 216, 220, 0.7)",
          borderRadius: 2,
          // borderColor: "#CFD8DC",
          alignSelf: "stretch",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" marginBottom={1}>
              <Box display="flex" alignItems="center" sx={{ paddingLeft: 1 }}>
                <Typography variant="h5">
                  Token Details - {tokenInfo.title}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton onClick={closeDetailHandler}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Button></Button>
          </Grid>
          <Grid item xs={2}>
            <Button></Button>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
    </Collapse>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TokenDetail);
