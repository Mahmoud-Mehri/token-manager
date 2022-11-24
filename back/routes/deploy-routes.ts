import { Router } from "express";
import { DeployController } from "../controller/deploy-controller";
import { ErrorCode, errorResponse, removeErrorCode } from "../model/general";

export const deployRouter = Router();
const deployController = new DeployController();

deployRouter.get("/:id", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);

  //   deployController.allAccounts(userId).then((result) => {
  //     res.status(result.errorCode).json(removeErrorCode(result));
  //   });
});

deployRouter.post("/", async (req, res) => {
  const userId = req.session.user.id;
  const tokenId = parseInt(req.body.tokenId);
  const accountId = parseInt(req.body.accountId);
  const serverId = parseInt(req.body.serverId);

  deployController
    .deployToken(userId, tokenId, accountId, serverId)
    .then((result) => {
      res.status(result.errorCode).json(removeErrorCode(result));
    });
});

deployRouter.put("/:id", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);

  // ...
});

deployRouter.delete("/:id", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);

  // ...
});

// Contract Methods
//
deployRouter.put("/:id/options", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);

  deployController
    .setTokenOptions(userId, deployId, req.body)
    .then((result) => {
      res.status(result.errorCode).json(removeErrorCode(result));
    });
});

deployRouter.get("/:id/options", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);

  deployController.getTokenOptions(userId, deployId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

deployRouter.get("/:id/active", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);

  deployController.getTokenActiveStatus(userId, deployId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

deployRouter.put("/:id/pause", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);

  deployController.setTokenPause(userId, deployId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

deployRouter.put("/:id/resume", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);

  deployController.setTokenResume(userId, deployId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

deployRouter.put("/:id/mint", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);
  const address = req.body.address;
  const amount = parseInt(req.body.amount);
  const data = req.body.data;
  const opData = req.body.operatorData;

  deployController
    .mintToken(userId, deployId, address, amount, data, opData)
    .then((result) => {
      res.status(result.errorCode).json(removeErrorCode(result));
    });
});

deployRouter.put("/:id/burn", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);
  const address = req.body.address;
  const amount = parseInt(req.body.amount);
  const data = req.body.data;
  const opData = req.body.operatorData;

  deployController
    .burnToken(userId, deployId, address, amount, data, opData)
    .then((result) => {
      res.status(result.errorCode).json(removeErrorCode(result));
    });
});

deployRouter.put("/:id/transfer", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);
  const from = req.body.from;
  const to = req.body.to;
  const amount = parseInt(req.body.amount);

  deployController
    .transferToken(userId, deployId, from, to, amount)
    .then((result) => {
      res.status(result.errorCode).json(removeErrorCode(result));
    });
});

deployRouter.get("/:id/balance/:address", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);
  const address = req.params.address;

  deployController.getBalance(userId, deployId, address).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

deployRouter.get("/:id/supply", async (req, res) => {
  const userId = req.session.user.id;
  const deployId = parseInt(req.params.id);

  deployController.getTotalSupply(userId, deployId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});
