import { Router } from "express";
import { UserController } from "../controller/user-controller";
import { newResponse } from "../model/general";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/", async (req, res) => {
  try {
    const result = await userController.allUsers();
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await userController.findUserById(userId);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const result = await userController.newUser(req.body);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await userController.updateUser(userId, req.body);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await userController.deleteUser(userId);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});
