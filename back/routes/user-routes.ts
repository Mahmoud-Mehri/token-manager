import { Router } from "express";
import { UserController } from "../controller/user-controller";
import { removeErrorCode } from "../model/general";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/", async (req, res) => {
  const userId = req.session.user.id;

  userController.allUsers(userId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

userRouter.get("/:id", async (req, res) => {
  const userId = req.session.user.id;
  const lookupUserId = parseInt(req.params.id);

  userController.findUserById(userId, lookupUserId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

userRouter.post("/", async (req, res) => {
  const userId = req.session.user.id;

  userController.newUser(userId, req.body).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

userRouter.put("/:id", async (req, res) => {
  const userId = req.session.user.id;
  const lookupUserId = parseInt(req.params.id);

  userController.updateUser(userId, lookupUserId, req.body).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

userRouter.delete("/:id", async (req, res) => {
  const userId = req.session.user.id;
  const lookupUserId = parseInt(req.params.id);

  userController.deleteUser(userId, lookupUserId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});
