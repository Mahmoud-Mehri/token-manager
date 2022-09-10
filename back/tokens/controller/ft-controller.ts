import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { newResponse } from "../../model/general";
import { HttpProvider } from "web3-core/types/index";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract/types/index";
import PromiEvent from "promievent";
import fs from "fs";

export type deployConfig = {
  providerUrl: string;
  esApiKey: string; // Ether Scan API Key
  privateKey: string;
  accountAddr: string;
  contractAddr: string;
};

export type FungibleTokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: string;
  mintable: boolean;
  burnable: boolean;
  pausable: boolean;
};

var provider: HttpProvider;
var walletProvider: HDWalletProvider;
var web3: Web3;
var contract: Contract;
var abi: AbiItem;
var byteCode: string;
var account: string;

const initialize = ({ providerUrl, privateKey, contractAddr }) => {
  provider = new Web3.providers.HttpProvider(`${providerUrl}`, {});
  walletProvider = new HDWalletProvider({
    privateKeys: [`${privateKey}`],
    providerOrUrl: provider,
  });
  web3 = new Web3(walletProvider);
  if (contractAddr && contractAddr !== "") {
    contract = new web3.eth.Contract(abi, contractAddr);
  } else {
    contract = new web3.eth.Contract(abi);
  }

  account = walletProvider.getAddress();
};

const getContractInfo = (tokenType: string) => {
  let fileName: string;
  if (tokenType.toUpperCase() === "FT") {
  } else {
  }
  byteCode = fs.readFileSync(`${fileName}`).toString();
  abi = JSON.parse(fs.readFileSync(`${fileName}`).toString());
};

export function fungibleTokenController() {
  this.deployNewToken = async (
    { name, symbol, initSupply },
    deployOptions: deployConfig
  ) => {
    return new PromiEvent((resolve, reject) => {
      initialize({
        providerUrl: deployOptions.providerUrl,
        privateKey: deployOptions.privateKey,
        contractAddr: "",
      });

      contract
        .deploy({ data: byteCode, arguments: [name, symbol, initSupply] })
        .send({
          from: `${account}`,
        })
        .on("error", function (err) {})
        .on("transactionHash", function (tranHash) {})
        .on("receipt", function (receipt) {})
        .on("confirmation", function (confirmationNumber, receipt) {});
    });
  };

  this.setOptions = async (
    { mintable, burnable, pausable },
    deployOptions: deployConfig
  ) => {
    try {
      initialize({
        providerUrl: deployOptions.providerUrl,
        privateKey: deployOptions.privateKey,
        contractAddr: deployOptions.contractAddr,
      });

      await contract.methods.setOptions([mintable, burnable, pausable]).send({
        from: `${account}`,
      });
      return newResponse(true, "");
    } catch (err) {
      return newResponse(false, err.message);
    }
  };

  this.mint = async (
    { address, amount, data },
    deployOptions: deployConfig
  ) => {
    try {
      initialize({
        providerUrl: deployOptions.providerUrl,
        privateKey: deployOptions.privateKey,
        contractAddr: deployOptions.contractAddr,
      });

      if (address && address !== "") {
        await contract.methods.mintTo([address, amount, data]).send({
          from: `${account}`,
        });
      } else {
        await contract.methods.mint([amount, data]).send({
          from: `${account}`,
        });
      }

      return newResponse(true, "");
    } catch (err) {
      return newResponse(false, err.message);
    }
  };

  this.burn = async ({ address, amount }, deployOptions: deployConfig) => {
    try {
      initialize({
        providerUrl: deployOptions.providerUrl,
        privateKey: deployOptions.privateKey,
        contractAddr: deployOptions.contractAddr,
      });

      if (address && address !== "") {
        await contract.methods.burnFrom([address, amount]).send({
          from: `${account}`,
        });
      } else {
        await contract.methods.burn([amount]).send({
          from: `${account}`,
        });
      }

      return newResponse(true, "");
    } catch (err) {
      return newResponse(false, err.message);
    }
  };

  this.transfer = async ({ from, to, amount }, deployOptions: deployConfig) => {
    try {
      initialize({
        providerUrl: deployOptions.providerUrl,
        privateKey: deployOptions.privateKey,
        contractAddr: deployOptions.contractAddr,
      });

      if (from && from !== "") {
        await contract.methods.transferFrom([from, to, amount]).send({
          from: `${account}`,
        });
      } else {
        await contract.methods.transfer([to, amount]).send({
          from: `${account}`,
        });
      }

      return newResponse(true, "");
    } catch (err) {
      return newResponse(false, err.message);
    }
  };

  this.getBalance = async ({ address }, deployOptions: deployConfig) => {
    try {
      initialize({
        providerUrl: deployOptions.providerUrl,
        privateKey: deployOptions.privateKey,
        contractAddr: deployOptions.contractAddr,
      });

      if (address && address !== "") {
        await contract.methods.balanceOf([address]).send({
          from: `${account}`,
        });
      } else {
        throw { message: "Invalid Address" };
      }

      return newResponse(true, "");
    } catch (err) {
      return newResponse(false, err.message);
    }
  };
}
