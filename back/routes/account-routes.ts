import { Router } from "express";
import { AccountController } from "../controller/account-controller";
import { ErrorCode, errorResponse, removeErrorCode } from "../model/general";

export const accountRouter = Router();
const accountController = new AccountController();

// Get All Accounts associated by User
accountRouter.get("/", async (req, res) => {
  const userId = req.session.user.id;

  accountController.allAccounts(userId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

// Get Account by ID
accountRouter.get("/:id", async (req, res) => {
  const accountId = parseInt(req.params.id);
  const userId = req.session.user.id;

  accountController.findAccountById(userId, accountId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

// Create new Account for User
accountRouter.post("/", async (req, res) => {
  const userId = req.session.user.id;

  if (!req.body.title) {
    const result = errorResponse(
      ErrorCode.BadRequest,
      "The field `title` is required"
    );

    return res.status(result.errorCode).json(removeErrorCode(result));
  }

  if (!req.body.address) {
    const result = errorResponse(
      ErrorCode.BadRequest,
      "The field `address` is required"
    );
    return res.status(result.errorCode).json(removeErrorCode(result));
  }

  accountController.addNewAccount(userId, req.body).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

accountRouter.put("/:id", async (req, res) => {
  const accountId = parseInt(req.params.id);
  const userId = req.session.user.id;

  accountController
    .updateAccount(userId, accountId, req.body)
    .then((result) => {
      res.status(result.errorCode).json(removeErrorCode(result));
    });
});

accountRouter.delete("/:id", async (req, res) => {
  const accountId = parseInt(req.params.id);
  const userId = req.session.user.id;

  accountController.deleteAccount(userId, accountId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});
