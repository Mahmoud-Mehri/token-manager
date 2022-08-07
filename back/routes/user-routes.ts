import { Router } from "express";
import { UserController } from "../controller/user-controller";
import { newResponse } from "../model/general";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/", (req, res) => {
  userController
    .allUsers()
    .then((users) => {
      res.status(200).json(newResponse(true, users));
    })
    .catch((err) => {
      res.status(500).json(newResponse(false, err.message));
    });
});

userRouter.get("/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    userController
      .findUserById(userId)
      .then((user) => res.status(200).json(newResponse(true, user)))
      .catch((err) => res.status(500).json(newResponse(false, err.message)));
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

userRouter.post("/", (req, res) => {
  console.log(req.body);
  userController
    .newUser(req.body)
    .then((user) => {
      res.json(newResponse(true, user));
    })
    .catch((err) => {
      res.json(newResponse(false, err.message));
    });
});

userRouter.put("/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    userController
      .updateUser(userId, req.body)
      .then((user) => {
        res.status(200).json(newResponse(true, user));
      })
      .catch((err) => {
        res.status(500).json(newResponse(false, err.message));
      });
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

userRouter.delete("/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    userController
      .deleteUser(userId)
      .then(() => {
        res.status(200).json(newResponse(true, userId));
      })
      .catch((err) => {
        res.status(500).json(newResponse(false, err.message));
      });
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});
