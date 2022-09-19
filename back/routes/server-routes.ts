import { Router } from "express";
import { ServerController } from "../controller/server-controller";
import { newResponse } from "../model/general";

export const serverRouter = Router();
const serverController = new ServerController();

serverRouter.get("/", async (req, res) => {
  try {
    const result = await serverController.allServers();
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

serverRouter.get("/:id", async (req, res) => {
  try {
    const serverId = parseInt(req.params.id);
    const result = await serverController.findServerById(serverId);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

serverRouter.post("/", async (req, res) => {
  try {
    const result = await serverController.newServer(req.body);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

serverRouter.put("/:id", async (req, res) => {
  try {
    const serverId = parseInt(req.params.id);
    const result = await serverController.updateServer(serverId, req.body);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

serverRouter.delete("/:id", async (req, res) => {
  try {
    const serverId = parseInt(req.params.id);
    const result = await serverController.deleteServer(serverId);
    if (!!result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});
