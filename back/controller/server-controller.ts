import { Server } from "../model/server";
import { successResponse, errorResponse, ErrorCode } from "../model/general";

export class ServerController {
  constructor() {}

  async findServerById(_userId: number, _serverId: number) {
    try {
      const server = await Server.findByPk(_serverId);
      if (!server)
        return errorResponse(ErrorCode.NotFound, "Server Not Found!");
      return successResponse(server);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async findServerByTitle(_userId: number, _title: string) {
    try {
      const server = await Server.findOne({
        where: {
          title: _title,
        },
      });

      if (!server) return errorResponse(ErrorCode.NotFound, "Server Not Found");

      return successResponse(server);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async allServers(_userId: number) {
    try {
      const servers = await Server.findAll({});
      return successResponse(servers);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async newServer(_userId: number, _serverInfo: any) {
    try {
      const server = new Server(_serverInfo);
      await server.save();
      return successResponse(server);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async updateServer(_userId: number, _serverId: number, _serverInfo: any) {
    try {
      const server = await Server.findByPk(_serverId);
      if (!server)
        return errorResponse(ErrorCode.NotFound, "Server Not Found!");
      await server.update(_serverInfo);

      return successResponse(server);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async deleteServer(_userId: number, _serverId: number) {
    try {
      const rows = await Server.destroy({ where: { id: _serverId } });
      if (rows == 0)
        return errorResponse(ErrorCode.NotFound, "Server Not Found!");

      return successResponse({}, "Server Deleted Successfully");
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }
}
