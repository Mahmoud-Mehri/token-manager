import Web3 from "web3";
// import ganache from "ganache";
import HDWalletProvider from "@truffle/hdwallet-provider";
import {
  successResponse,
  errorResponse,
  ErrorCode,
  ControllerResponse,
  TokenType,
  DeployConfig,
  ERC1820_ADDRESS,
  ERC1820_DEPLOYER,
  ERC1820_PAYLOAD,
} from "../../model/general";
import { HttpProvider } from "web3-core/types/index";
import { AbiItem } from "web3-utils";
import { Contract, ContractSendMethod } from "web3-eth-contract/types/index";
import { getContractData } from "../compile/compile.js";

export type FungibleTokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: string;
  mintable: boolean;
  burnable: boolean;
  pausable: boolean;
};

export class FungibleTokenController {
  private provider: HttpProvider;
  private walletProvider: HDWalletProvider;
  private web3: Web3;
  private contract: Contract;
  private abi: AbiItem;
  private byteCode: string;
  private accounts: string[];
  private account: string;

  async ensureERC1820(provider) {
    provider.send(
      {
        method: "eth_getCode",
        params: [ERC1820_ADDRESS, "latest"],
      },
      (err, result) => {
        if (!err) {
          const code = result.result;
          if (code === "0x") {
            console.log("ERC1820 NOT Registered!");

            provider.send({ method: "eth_accounts" }, (err, result) => {
              if (!err) {
                console.log(`RESULT: ${JSON.stringify(result)}`);
                provider.send(
                  {
                    method: "eth_sendTransaction",
                    params: [
                      {
                        from: result.result[0],
                        to: ERC1820_DEPLOYER,
                        value: "0x11c37937e080000",
                      },
                    ],
                  },
                  (err, result) => {
                    if (!err) {
                      provider.send(
                        {
                          method: "eth_sendRawTransaction",
                          params: [ERC1820_PAYLOAD],
                        },
                        (err, result) => {
                          if (!err)
                            console.log(
                              "ERC1820 registry successfully deployed"
                            );
                          else
                            console.log(
                              `Error On Checking ERC1820 (3): \n${err}`
                            );
                        }
                      );
                    } else
                      console.log(`Error On Checking ERC1820 (2): \n${err}`);
                  }
                );
              }
            });
          } else {
            console.log(`ERC1820 IS Registered`);
          }
        } else console.log(`Error On Checking ERC1820 (1): \n${err}`);
      }
    );
  }

  private initialize = async (
    { providerUrl, privateKey, contractAddr, accountAddr },
    resolveCB: CallableFunction
  ) => {
    const contractData = getContractData(TokenType.FT);
    // console.log(`ABI VALUE: ${JSON.stringify(contractData.abi)}`);

    this.abi = contractData.abi;
    this.byteCode = contractData.bytecode;

    // provider = new Web3.providers.HttpProvider(`${providerUrl}`);
    this.walletProvider = new HDWalletProvider({
      privateKeys: [`${privateKey}`],
      providerOrUrl: providerUrl,
    });

    // const provider = ganache.provider({
    //   fork: {
    //     url: providerUrl,
    //   },
    //   wallet: {
    //     mnemonic:
    //       "fluid post because argue daring good pride payment raccoon tongue refuse armed",
    //     defaultBalance: 100,
    //     totalAccounts: 10,
    //   },
    // });

    this.web3 = new Web3(this.walletProvider);

    // console.log(`CONTRACT ADDRESS: "${contractAddr}"`);
    // console.log(`CONTRACT ABI: \n"${this.abi}"`);

    if (contractAddr && contractAddr !== "") {
      this.contract = new this.web3.eth.Contract(this.abi, contractAddr);
    } else {
      console.log(`Before ENSURE: \n${this.web3.currentProvider}`);
      await this.ensureERC1820(this.web3.currentProvider);

      this.contract = new this.web3.eth.Contract(this.abi);
    }

    const allAccounts = await this.web3.eth.getAccounts();
    this.accounts = allAccounts; // Object.keys(allAccounts);

    const accountIndex = this.accounts.findIndex((value, idx) => {
      return value === accountAddr;
    });
    if (accountIndex === -1) {
      if (resolveCB)
        return resolveCB(
          errorResponse(
            ErrorCode.AccessDenied,
            "The PrivateKey and Account Address did not match!"
          )
        );
      else
        return errorResponse(
          ErrorCode.AccessDenied,
          "The PrivateKey and Account Address did not match!"
        );
    }
    this.account = this.accounts[accountIndex];
    this.contract.defaultAccount = this.account;
  };

  private sendTransaction = async (
    method: ContractSendMethod,
    resolveCB: CallableFunction,
    wfc: boolean = false
  ) => {
    const gas = await method.estimateGas();
    const gasPrice = await this.web3.eth.getGasPrice(); // web3.utils.toWei("0.00000002", "ether");

    method
      .send({
        from: `${this.account}`,
        gas: gas,
        gasPrice: gasPrice,
      })
      .on("error", function (err) {
        console.log(`Error: ${JSON.stringify(err)}`);
        resolveCB(errorResponse(ErrorCode.Exception, JSON.stringify(err)));
      })
      .on("transactionHash", function (tranHash) {
        // console.log(`TRAN HASH: ${tranHash}`);
      })
      .on("receipt", function (receipt) {
        // console.log(`RECEIPT: ${JSON.stringify(receipt)}`);
        if (!wfc) {
          resolveCB(successResponse({ receipt }));
        }
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        // console.log(
        //   `CONFIRMATION: ${JSON.stringify({ confirmationNumber, receipt })}`
        // );
        if (wfc) {
          resolveCB(successResponse({ confirmationNumber, receipt }));
        }
      });
  };

  async deployNewToken(
    { name, symbol },
    deployOptions: DeployConfig,
    waitForConfirmation: boolean = false
  ) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: "",
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        const deploy = this.contract.deploy({
          data: "0x" + this.byteCode,
          arguments: [name, symbol, []],
        });

        const gas = await deploy.estimateGas(); // 6721975; //
        const gasPrice = await this.web3.eth.getGasPrice(); // web3.utils.toWei("0.00000002", "ether"); //

        deploy
          .send({
            from: `${this.account}`,
            gas: gas,
            gasPrice: gasPrice,
          })
          .on("error", function (err) {
            resolve(errorResponse(ErrorCode.Exception, err.message));
          })
          .on("transactionHash", function (tranHash) {})
          .on("receipt", function (receipt) {
            if (!waitForConfirmation) {
              resolve(
                successResponse({ contractAddress: receipt.contractAddress })
              );
            }
          })
          .on("confirmation", function (confirmationNumber, receipt) {
            if (waitForConfirmation) {
              resolve(successResponse({ confirmationNumber, receipt }));
            }
          });
      } catch (err) {
        resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async setOptions(
    input: { mintable: boolean; burnable: boolean; pausable: boolean },
    deployOptions: DeployConfig,
    waitForConfirmation: boolean = false
  ) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        const setOptions = this.contract.methods.setOptions(
          input.mintable,
          input.burnable,
          input.pausable
        );

        await this.sendTransaction(setOptions, resolve, waitForConfirmation);
      } catch (err) {
        resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async getOptions(deployOptions: DeployConfig) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        const getOptionsMethod = this.contract.methods.getOptions();

        const result = await getOptionsMethod.call({ from: this.account });
        resolve(
          successResponse({
            mintable: result[0],
            burnable: result[1],
            pausable: result[2],
          })
        );
      } catch (err) {
        resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async setPause(
    deployOptions: DeployConfig,
    waitForConfirmation: boolean = false
  ) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        const pauseMethod = this.contract.methods.pause();

        await this.sendTransaction(pauseMethod, resolve, waitForConfirmation);
      } catch (err) {
        resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async resume(
    deployOptions: DeployConfig,
    waitForConfirmation: boolean = false
  ) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        const resumeMethod = this.contract.methods.resume();

        await this.sendTransaction(resumeMethod, resolve, waitForConfirmation);
      } catch (err) {
        resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async getActiveStatus(deployOptions: DeployConfig) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        const getStatusMethod = this.contract.methods.getActiveStatus();

        const result = await getStatusMethod.call({ from: this.account });
        resolve(successResponse({ active: result }));
      } catch (err) {
        resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async mint(
    input: { address: string; amount: number; data: string; opData: string },
    deployOptions: DeployConfig,
    waitForConfirmation: boolean = false
  ) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        let mintMethod: ContractSendMethod;
        if (input.address && input.address !== "") {
          mintMethod = this.contract.methods.mintTo(
            input.address,
            input.amount,
            input.data !== "" ? this.web3.utils.utf8ToHex(input.data) : [],
            input.opData !== "" ? this.web3.utils.utf8ToHex(input.opData) : []
          );
        } else {
          mintMethod = this.contract.methods.mint(
            input.amount,
            input.data !== "" ? this.web3.utils.utf8ToHex(input.data) : []
          );
        }

        await this.sendTransaction(mintMethod, resolve, waitForConfirmation);
      } catch (err) {
        return resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async burn(
    input: { address: string; amount: number; data: string; opData: string },
    deployOptions: DeployConfig,
    waitForConfirmation: boolean = false
  ) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        let burnMethod: ContractSendMethod;
        if (input.address && input.address !== "") {
          burnMethod = this.contract.methods.burnFrom(
            input.address,
            input.amount,
            input.data !== "" ? this.web3.utils.utf8ToHex(input.data) : [],
            input.opData !== "" ? this.web3.utils.utf8ToHex(input.opData) : []
          );
        } else {
          burnMethod = this.contract.methods.burn(
            input.amount,
            input.data !== "" ? this.web3.utils.utf8ToHex(input.data) : []
          );
        }

        await this.sendTransaction(burnMethod, resolve, waitForConfirmation);
      } catch (err) {
        return resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async transfer(
    input: { from: string; to: string; amount: number },
    deployOptions: DeployConfig,
    waitForConfirmation: boolean = false
  ) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        let transferMethod: ContractSendMethod;
        if (input.from && input.from !== "") {
          transferMethod = this.contract.methods.transferFrom(
            input.from,
            input.to,
            input.amount
          );
        } else {
          transferMethod = this.contract.methods.transfer(
            input.to,
            input.amount
          );
        }

        await this.sendTransaction(
          transferMethod,
          resolve,
          waitForConfirmation
        );
      } catch (err) {
        return resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async getBalance(input: { address: string }, deployOptions: DeployConfig) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        if (input.address && input.address !== "") {
          const result = await this.contract.methods
            .balanceOf(input.address)
            .call({
              from: `${this.account}`,
            });

          return resolve(successResponse({ balance: result }));
        } else {
          return resolve(
            errorResponse(ErrorCode.BadRequest, "Invalid Address")
          );
        }
      } catch (err) {
        return resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }

  async getTotalSupply(deployOptions: DeployConfig) {
    return new Promise<ControllerResponse>(async (resolve, reject) => {
      try {
        await this.initialize(
          {
            providerUrl: deployOptions.providerUrl,
            privateKey: deployOptions.privateKey,
            contractAddr: deployOptions.contractAddr,
            accountAddr: deployOptions.accountAddr,
          },
          resolve
        );

        const result = await this.contract.methods.totalSupply().call({
          from: `${this.account}`,
        });

        return resolve(successResponse({ totalSupply: result }));
      } catch (err) {
        return resolve(errorResponse(ErrorCode.Exception, err.message));
      }
    });
  }
}
