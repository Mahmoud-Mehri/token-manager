import { Router } from "express";
import { ServerController } from "../controller/server-controller";
import { newResponse } from "../model/general";

export const serverRouter = Router();
const serverController = new ServerController();

serverRouter.get("/", (req, res) => {
  serverController
    .allServers()
    .then((servers) => {
      res.status(200).json(newResponse(true, servers));
    })
    .catch((err) => {
      res.status(500).json(newResponse(false, err.message));
    });
});

serverRouter.get("/:id", (req, res) => {
  try {
    const serverId = parseInt(req.params.id);
    serverController
      .findServerById(serverId)
      .then((Server) => res.status(200).json(newResponse(true, Server)))
      .catch((err) => res.status(500).json(newResponse(false, err.message)));
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

serverRouter.post("/", (req, res) => {
  serverController
    .newServer(req.body)
    .then((Server) => {
      res.json(newResponse(true, Server));
    })
    .catch((err) => {
      res.json(newResponse(false, err.message));
    });
});

serverRouter.put("/:id", (req, res) => {
  try {
    const serverId = parseInt(req.params.id);
    serverController
      .updateServer(serverId, req.body)
      .then((Server) => {
        res.status(200).json(newResponse(true, Server));
      })
      .catch((err) => {
        res.status(500).json(newResponse(false, err.message));
      });
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});

serverRouter.delete("/:id", (req, res) => {
  try {
    const serverId = parseInt(req.params.id);
    serverController
      .deleteServer(serverId)
      .then(() => {
        res.status(200).json(newResponse(true, serverId));
      })
      .catch((err) => {
        res.status(500).json(newResponse(false, err.message));
      });
  } catch (err) {
    res.status(500).json(newResponse(false, err.message));
  }
});
