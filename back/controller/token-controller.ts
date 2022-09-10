import { newResponse } from "../model/general";
import { Server } from "../model/server";
import { Token } from "../model/token";
import { User } from "../model/user";
import {
  fungibleTokenController,
  deployConfig,
} from "../tokens/controller/ft-controller";
import { NonFungibleController } from "../tokens/controller/nft-controller";

export class TokenController {
  private ftController;
  private nftController;

  constructor() {
    this.ftController = fungibleTokenController();
  }

  async findTokenById(_tokenId: number, _includeUser: boolean = false) {
    try {
      let token: Token;
      if (_includeUser)
        token = await Token.findByPk(_tokenId, {
          include: {
            model: User,
          },
        });
      else token = await Token.findByPk(_tokenId);
      return newResponse(true, token);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async allTokens(_includeUser: boolean = false) {
    try {
      let tokens: Token[];
      if (_includeUser)
        tokens = await Token.findAll({ include: { model: User } });
      else tokens = await Token.findAll({});
      return newResponse(true, tokens);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async newToken(_userId: number, _tokenInfo: any) {
    try {
      const token = new Token(_tokenInfo);
      await token.save();
      return newResponse(true, token);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async updateToken(_tokenId: number, _tokenInfo: any) {
    try {
      const token = await Token.findByPk(_tokenId);
      if (!token) throw new Error("Token Not Found");

      token.set(_tokenInfo);
      await token.save();
      return newResponse(true, token);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async deleteToken(_tokenId: number) {
    try {
      if (await Token.destroy({ where: { id: _tokenId } }))
        return newResponse(true, "Token deleted successfully");
      else return newResponse(false, "Token not exists!");
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  // async getTokenAccounts(_tokenId: string) {
  //   try {
  //     const token = await Token.findByPk(_tokenId);
  //     if (!token) throw new Error("Token Not Found");

  //     const accounts = Array.from(token.accounts);
  //     return newResponse(true, accounts);
  //   } catch (err) {
  //     return newResponse(false, err.message);
  //   }
  // }

  // async addAccountToToken(_tokenId: string, _account: string) {
  //   try {
  //     const token = await Token.update(
  //       _tokenId,

  //     );

  //     return newResponse(false, "Account added successfully");
  //   } catch (err) {
  //     return newResponse(false, err.message);
  //   }
  // }

  async deployToken(
    _tokenId: number,
    _serverId: number,
    _privateKey: string,
    _accountAddr: string,
    _initialSupply: string
  ) {
    try {
      const token = await Token.findByPk(_tokenId);
      if (!token) throw { message: "Token Not Found!" };
      const server = await Server.findByPk(_serverId);
      if (!server) throw { message: "Server Not Found!" };
      const deployOptions: deployConfig = {
        providerUrl: server.providerUrl,
        esApiKey: "",
        privateKey: _privateKey,
        accountAddr: _accountAddr,
        contractAddr: "",
      };
      const deployResult = await this.ftController.deployNewToken(
        {
          name: token.title,
          symbol: token.symbol,
          initSupply: _initialSupply,
        },
        deployOptions
      );

      // ...
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async setTokenOptions(_tokenId: number, { mintable, burnable, pausable }) {
    try {
      const token = await Token.findByPk(_tokenId);
      if (!token) return newResponse(false, "Token not found!");
      else {
        if (token.tokenType === "FT") {
          const promise = this.ftController.setOptions({
            mintable: !!mintable,
            burnable: !!burnable,
            pausable: !!pausable,
          });
          promise.on();
        } else if (token.tokenType === "NFT") {
        } else {
          throw { message: "Invalid Token Type!" };
        }
      }
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async mintToken(_tokenId: number, _accountAddr: string) {
    // ...
  }

  async burnToken(_tokenId: number, _accountAddr: string) {
    // ...
  }
}
