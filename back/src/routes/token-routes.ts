import { Router } from "express";
import { TokenController } from "../controller/token-controller";
import { ErrorCode, errorResponse, removeErrorCode } from "../model/general";

export const tokenRouter = Router();
const tokenController = new TokenController();

// Get All Tokens associated by User
tokenRouter.get("/", async (req, res) => {
  // const includeUsers = req.query.includeUsers
  //   ? req.query.includeUsers == "true"
  //   : false;

  const userId = req.session.user.id;

  tokenController.getUserTokens(userId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

tokenRouter.get("/:id", async (req, res) => {
  const tokenId = parseInt(req.params.id);
  const userId = req.session.user.id;

  tokenController.findTokenById(userId, tokenId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

tokenRouter.get("/:id/deploys", async (req, res) => {
  const userId = req.session.user.id;
  const tokenId = parseInt(req.params.id);

  tokenController.getTokenDeploys(userId, tokenId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

tokenRouter.post("/", async (req, res) => {
  const userId = req.session.user.id;

  if (!req.body.title) {
    const result = errorResponse(
      ErrorCode.BadRequest,
      "The field `title` is required"
    );
    return res.status(result.errorCode).json(removeErrorCode(result));
  }

  if (!req.body.symbol) {
    const result = errorResponse(
      ErrorCode.BadRequest,
      "The field `symbol` is required"
    );
    return res.status(result.errorCode).json(removeErrorCode(result));
  }

  tokenController.newToken(userId, req.body).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

tokenRouter.put("/:id", async (req, res) => {
  const tokenId = parseInt(req.params.id);
  const userId = req.session.user.id;

  tokenController.updateToken(userId, tokenId, req.body).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

tokenRouter.delete("/:id", async (req, res) => {
  const tokenId = parseInt(req.params.id);
  const userId = req.session.user.id;

  tokenController.deleteToken(userId, tokenId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});
