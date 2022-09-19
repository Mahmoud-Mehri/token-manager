import { Router } from "express";
import { TokenController } from "../controller/token-controller";
import { newResponse } from "../model/general";

export const tokenRouter = Router();
const tokenController = new TokenController();

tokenRouter.get("/", async (req, res) => {
  const includeUsers = req.query.includeUsers
    ? req.query.includeUsers == "true"
    : false;
  try {
    const result = await tokenController.allTokens(includeUsers);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

tokenRouter.get("/:id", async (req, res) => {
  try {
    const tokenId = parseInt(req.params.id);
    const result = await tokenController.findTokenById(tokenId);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

tokenRouter.post("/", async (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).json(newResponse(false, "The field `title` is required"));
    } else if (!req.body.title) {
      res.status(400).json(newResponse(false, "The field `title` is required"));
    } else if (!req.body.symbol) {
      res
        .status(400)
        .json(newResponse(false, "The field `symbol` is required"));
    } else {
      const result = await tokenController.newToken(req.body.userId, req.body);
      if (!!result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

tokenRouter.put("/:id", async (req, res) => {
  try {
    const tokenId = parseInt(req.params.id);
    const result = await tokenController.updateToken(tokenId, req.body);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

tokenRouter.delete("/:id", async (req, res) => {
  try {
    const tokenId = parseInt(req.params.id);
    const result = await tokenController.deleteToken(tokenId);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

// tokenRouter.get("/:id/accounts", (req, res) => {
//   const tokenId = req.params.id;
//   tokenController
//     .getTokenUser(tokenId)
//     .then((users) => res.json(newResponse(true, users)))
//     .catch((err) => res.json(newResponse(false, err.message)));
// });

// tokenRouter.post("/:id/accounts", (req, res) => {
//   const tokenId = req.params.id;
//   const userId = req.body.userId;
//   tokenController
//     .addAccountToToken(tokenId, userId)
//     .then((message) => res.json(newResponse(true, message)))
//     .catch((err) => res.json(newResponse(false, err.message)));
// });
