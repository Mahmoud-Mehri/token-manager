import { Router } from "express";
import { ServerController } from "../controller/server-controller";
import { removeErrorCode } from "../model/general";

export const serverRouter = Router();
const serverController = new ServerController();

serverRouter.get("/", async (req, res) => {
  const userId = req.session.user.id;

  serverController.allServers(userId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

serverRouter.get("/:id", async (req, res) => {
  const serverId = parseInt(req.params.id);
  const userId = req.session.user.id;

  serverController.findServerById(userId, serverId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

serverRouter.post("/", async (req, res) => {
  const userId = req.session.user.id;

  serverController.newServer(userId, req.body).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

serverRouter.put("/:id", async (req, res) => {
  const serverId = parseInt(req.params.id);
  const userId = req.session.user.id;

  serverController.updateServer(userId, serverId, req.body).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

serverRouter.delete("/:id", async (req, res) => {
  const serverId = parseInt(req.params.id);
  const userId = req.session.user.id;

  serverController.deleteServer(userId, serverId).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});
