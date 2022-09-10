import { Server } from "../model/server";
import { newResponse } from "../model/general";

export class ServerController {
  constructor() {}

  async findServerById(_serverId: number) {
    try {
      const server = await Server.findByPk(_serverId);
      if (server) {
        return newResponse(true, server);
      } else {
        throw new Error("Server Not Found!");
      }
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async findServerByTitle(_title: string) {
    try {
      const server = await Server.findOne({
        where: {
          title: _title,
        },
      });
      if (server) return newResponse(true, server);
      throw new Error("Server Not Found");
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async allServers() {
    try {
      const servers = await Server.findAll({});
      return newResponse(true, servers);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async newServer(_serverInfo: any) {
    try {
      const server = new Server(_serverInfo);
      await server.save();
      return newResponse(true, server);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async updateServer(_serverId: number, _serverInfo: any) {
    try {
      const server = await Server.findByPk(_serverId);
      if (!server) throw new Error("Server Not Found");
      await server.update(_serverInfo);
      return newResponse(true, server);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async deleteServer(_serverId: number) {
    try {
      const rows = await Server.destroy({ where: { id: _serverId } });
      if (rows > 0) return newResponse(true, "Server deleted successfully");
      throw new Error("Server Not found");
    } catch (err) {
      return newResponse(false, err.message);
    }
  }
}
