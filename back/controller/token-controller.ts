import { Deploy } from "../model/deploy";
import { successResponse, errorResponse, ErrorCode } from "../model/general";
import { Server } from "../model/server";
import { Token } from "../model/token";
import { User } from "../model/user";

export class TokenController {
  constructor() {}

  async findTokenById(
    _userId: number,
    _tokenId: number,
    _includeUser: boolean = false
  ) {
    try {
      let token: Token;
      if (_includeUser)
        token = await Token.findByPk(_tokenId, {
          include: {
            model: User,
          },
        });
      else token = await Token.findByPk(_tokenId);

      if (!token) return errorResponse(ErrorCode.NotFound, "Token Not Found !");

      if (token.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this token"
        );

      return successResponse(token);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async allTokens(_includeUser: boolean = false) {
    try {
      let tokens: Token[];
      if (_includeUser)
        tokens = await Token.findAll({ include: { model: User } });
      else tokens = await Token.findAll({});

      return successResponse(tokens);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async getUserTokens(_userId: number) {
    try {
      const tokens = await Token.findAll({
        where: {
          userId: _userId,
        },
      });

      return successResponse(tokens);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async getTokenDeploys(_userId: number, _tokenId: number) {
    try {
      const token = await Token.findByPk(_tokenId);
      if (!token) return errorResponse(ErrorCode.NotFound, "Token Not Found!");
      if (token.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this Token!"
        );

      const deploys = await Deploy.findAll({
        where: {
          tokenId: _tokenId,
        },
        include: {
          model: Server,
          as: "server",
          attributes: ["id", "title", "providerUrl", "serverType"],
        },
        attributes: {
          exclude: ["serverId", "tokenId"],
        },
      });

      return successResponse(deploys);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async newToken(_userId: number, _tokenInfo: any) {
    try {
      _tokenInfo.userId = _userId;

      const token = new Token(_tokenInfo);
      const newToken = await token.save();

      return successResponse(newToken);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async updateToken(_userId: number, _tokenId: number, _tokenInfo: any) {
    try {
      const token = await Token.findByPk(_tokenId);
      if (!token) return errorResponse(ErrorCode.NotFound, "Token Not Found");

      if (token.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this token"
        );

      token.set(_tokenInfo);
      const newToken = await token.save();

      return successResponse(newToken);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async deleteToken(_userId: number, _tokenId: number) {
    try {
      const token = await Token.findByPk(_tokenId);
      if (!token) return errorResponse(ErrorCode.NotFound, "Token Not Found!");
      if (token.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this token!"
        );

      await token.destroy();
      return successResponse({}, "Token Deleted Successfully");
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }
}
