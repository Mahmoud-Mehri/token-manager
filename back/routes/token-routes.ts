import { Router } from "express";
import { TokenController } from "../controller/token-controller";
import { newResponse } from "../model/general";

export const tokenRouter = Router();
const tokenController = new TokenController();

tokenRouter.get("/", (req, res) => {
  const includeUsers = req.query.includeUsers
    ? req.query.includeUsers == "true"
    : false;
  tokenController
    .allTokens(includeUsers)
    .then((tokens) => {
      res.status(200).json(newResponse(true, tokens));
    })
    .catch((err) => {
      res.status(500).send(newResponse(false, err.message));
    });
});

tokenRouter.get("/:id", (req, res) => {
  try {
    const tokenId = parseInt(req.params.id);
    tokenController
      .findTokenById(tokenId)
      .then((token) => res.status(200).json(newResponse(true, token)))
      .catch((err) => res.status(500).json(newResponse(false, err.message)));
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

tokenRouter.post("/", (req, res) => {
  const userId = req.body.userId;
  if (userId && typeof userId === "number") {
    tokenController
      .newToken(userId, req.body)
      .then((Token) => {
        res.status(200).json(newResponse(true, Token));
      })
      .catch((err) => {
        res.status(500).json(newResponse(false, err.message));
      });
  } else {
    res.status(500).json(newResponse(false, "User Id is not valid"));
  }
});

tokenRouter.put("/:id", (req, res) => {
  try {
    const tokenId = parseInt(req.params.id);
    tokenController
      .updateToken(tokenId, req.body)
      .then((token) => {
        res.status(200).json(newResponse(true, token));
      })
      .catch((err) => {
        res.status(500).json(newResponse(false, err.message));
      });
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

tokenRouter.delete("/:id", (req, res) => {
  try {
    const tokenId = parseInt(req.params.id);
    tokenController
      .deleteToken(tokenId)
      .then(() => {
        res.status(200).json(newResponse(true, tokenId));
      })
      .catch((err) => {
        res.status(500).json(newResponse(false, err.message));
      });
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
