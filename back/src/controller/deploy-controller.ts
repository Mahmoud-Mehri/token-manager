import {
  successResponse,
  errorResponse,
  ErrorCode,
  TokenType,
  TokenDeployStatus,
  DeployConfig,
  ControllerResponse,
} from "../model/general";
import { Server } from "../model/server";
import { Token } from "../model/token";
import { User } from "../model/user";
import { Deploy } from "../model/deploy";
import { FungibleTokenController } from "../tokens/controller/ft-controller";
import { NonFungibleController } from "../tokens/controller/nft-controller";
import { Account } from "../model/account";
import { Sequelize } from "sequelize/types";

export class DeployController {
  private ftController: FungibleTokenController;
  private nftController: NonFungibleController;

  constructor() {
    this.ftController = new FungibleTokenController();
    this.nftController = new NonFungibleController();
  }

  private async getDeployInfo(
    _userId: number,
    _deployId: number
  ): Promise<ControllerResponse> {
    try {
      const deploy = await Deploy.findByPk(_deployId, {
        // attributes: {
        //   include: [
        //     [Sequelize.col("token.userId"), "userId"],
        //     [Sequelize.col("token.tokenType"), "tokenType"],
        //   ],
        // },
        include: [
          {
            model: Token,
            as: "token",
            attributes: ["userId", "type"],
          },
          {
            model: Server,
            as: "server",
            attributes: ["providerUrl"],
          },
          {
            model: Account,
            as: "account",
            attributes: ["privateKey", "address"],
          },
        ],
      });

      if (!deploy)
        return errorResponse(ErrorCode.NotFound, "Deploy Info Not Found!");

      if (deploy.token.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this Contract"
        );

      const deployConfig: DeployConfig = {
        providerUrl: deploy.server.providerUrl,
        esApiKey: "", // Ether Scan API Key
        privateKey: deploy.account.privateKey,
        accountAddr: deploy.account.address,
        contractAddr: deploy.address,
      };

      return successResponse({ deploy, deployConfig });
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async deployToken(
    _userId: number,
    _tokenId: number,
    _accountId: number,
    _serverId: number
  ) {
    try {
      const token = await Token.findByPk(_tokenId);
      if (!token) return errorResponse(ErrorCode.NotFound, "Token Not Found!");
      if (token.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this Token!"
        );

      const account = await Account.findByPk(_accountId);
      if (!account)
        return errorResponse(ErrorCode.NotFound, "Account Not Found!");

      if (account.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this Account!"
        );

      const server = await Server.findByPk(_serverId);
      if (!server)
        return errorResponse(ErrorCode.NotFound, "Server Not Found!");

      const deployOptions: DeployConfig = {
        providerUrl: server.providerUrl,
        esApiKey: "",
        privateKey: account.privateKey,
        accountAddr: account.address,
        contractAddr: "",
      };

      const deployResult = await this.ftController.deployNewToken(
        {
          name: token.title,
          symbol: token.symbol,
        },
        deployOptions,
        false
      );

      console.log(`RESULT: ${JSON.stringify(deployResult)}`);
      if (deployResult.success) {
        console.log(`SUCCESS`);

        const deploy = new Deploy();
        deploy.serverId = server.id;
        deploy.tokenId = token.id;
        deploy.accountId = account.id;
        deploy.address = deployResult.data.contractAddress;
        deploy.status = TokenDeployStatus.ACTIVE;
        deploy.deployAccountAddress = account.address;
        deploy.ownerAccountAddress = account.address;
        deploy.optBurnable = true;
        deploy.optMintable = true;
        deploy.optPausable = true;

        const newDeploy = await deploy.save();

        return successResponse(newDeploy);
      }

      return deployResult;
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async setTokenOptions(
    _userId: number,
    _deployId: number,
    { mintable, burnable, pausable }
  ) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.setOptions(
            {
              mintable: !!mintable,
              burnable: !!burnable,
              pausable: !!pausable,
            },
            deployConfig
          );

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async getTokenOptions(_userId: number, _deployId: number) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.getOptions(deployConfig);

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async setTokenPause(_userId: number, _deployId: number) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.setPause(deployConfig);

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async setTokenResume(_userId: number, _deployId: number) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.resume(deployConfig);

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async getTokenActiveStatus(_userId: number, _deployId: number) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.getActiveStatus(deployConfig);

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async mintToken(
    _userId: number,
    _deployId: number,
    _address: string,
    _amount: number,
    _data: string = "",
    _opData: string = ""
  ) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.mint(
            {
              address: _address,
              amount: _amount,
              data: _data,
              opData: _opData,
            },
            deployConfig
          );

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async burnToken(
    _userId: number,
    _deployId: number,
    _address: string,
    _amount: number,
    _data: string = "",
    _opData: string = ""
  ) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.burn(
            {
              address: _address,
              amount: _amount,
              data: _data,
              opData: _opData,
            },
            deployConfig
          );

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async transferToken(
    _userId: number,
    _deployId: number,
    _from: string,
    _to: string,
    _amount: number
  ) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.transfer(
            {
              from: _from,
              to: _to,
              amount: _amount,
            },
            deployConfig
          );

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async getBalance(_userId: number, _deployId: number, _accountAddr: string) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.getBalance(
            { address: _accountAddr },
            deployConfig
          );

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async getTotalSupply(_userId: number, _deployId: number) {
    try {
      const result = await this.getDeployInfo(_userId, _deployId);

      if (!result.success) {
        return result;
      }
      const { deploy, deployConfig } = result.data;

      switch (deploy.token.type) {
        case TokenType.FT: {
          const result = await this.ftController.getTotalSupply(deployConfig);

          return result;
        }
        case TokenType.NFT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        case TokenType.MT: {
          return errorResponse(ErrorCode.Exception, "Under Development!");
        }
        default:
          return errorResponse(ErrorCode.Exception, "Invalid Token Type!");
      }
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }
}
