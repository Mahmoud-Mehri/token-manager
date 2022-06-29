import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract, ContractFactory } from "ethers";
import hardhat, { ethers } from "hardhat";
import { EthereumProvider } from "hardhat/types";
import { newResponse } from "../../model/general";
import promievent from 'promievent';

export type deployConfig = {
    privateKey: string;
    apiUrl: string;
    esApiKey: string;
    ownerAddress: string;
}

export type ERC20TokenInfo = {
    name: string;
    symbol: string;
    decimals: number;
    initialSupply: string;
    mintable: boolean;
    burnable: boolean;
    pausable: boolean;
}

export class ERC20Controller {

    private _provider: EthereumProvider;
    private _contract: ContractFactory;
    private _token: Contract;
    private _deployedToken: Contract;
    private _accounts: SignerWithAddress[];
    private _initialSupply: BigNumber;
    private _decimals: number;
    private _OwnerAddress: string;
    private _owner: SignerWithAddress;

    constructor(deployConfig: deployConfig, tokenInfo_: ERC20TokenInfo) {
        this._contract = null;
        this._token = null;
        this._deployedToken = null;
        this._accounts = [];
        this._decimals = tokenInfo_.decimals;
        this._initialSupply = BigNumber.from(tokenInfo_.initialSupply);
        this._OwnerAddress = deployConfig.ownerAddress;
    }

    private _getSignerByAddress(address_: string) {
        const account = this._accounts.find((acc) => {
            return acc.address == address_;
        });

        if (!account) return null;
        return account;
    }

    private _checkDeployed() {
        return !this._token;
    }

    async deployNewToken({ name, symbol, initSupply, decimals }) {
        this._decimals = decimals;
        this._accounts = await ethers.getSigners();
        this._initialSupply = ethers.utils.parseEther(`${initSupply}`);
        this._contract = await ethers.getContractFactory('ERC20Token');
        this._token = await this._contract.deploy(
            `${name}`,
            `${symbol}`,
            `${this._decimals}`,
            `${this._initialSupply}`
        );
        this._deployedToken = await this._token.deployed();
    }

    async setOptions(mintable: boolean, burnable: boolean, pausable: boolean) {
        const promise = new promievent(async (resolve, reject) => {
            if (!this._checkDeployed()) {
                throw new Error("Token is not Deployed");
            }

            try {
                const response = await this._token.setOptions(
                    `${mintable}`,
                    `${burnable}`,
                    `${pausable}`
                );
                promise.emit('sent', [response.hash]);

                const reciept = await response.wait();
                if (reciept.status == 1) {
                    promise.emit('confirmed')
                } else {
                    promise.emit('declined');
                }

                resolve(newResponse(true, reciept));
            } catch (err) {
                promise.emit('error', [err]);
                reject(newResponse(false, err.message))
            }
        });

        return promise;
    }


    async mint(address_: string, amount_: string) {
        const promise = new promievent(async (resolve, reject) => {
            if (!this._checkDeployed()) {
                throw new Error("Token is not Deployed");
            }

            try {
                const amount = ethers.utils.parseEther(amount_);
                let response;
                if (address_ && address_ !== '') {
                    response = await this._token.mintTo(`${address_}`, `${amount}`);
                } else {
                    response = await this._token.mint(`${amount}`);
                }
                promise.emit('sent', [response.hash]);

                const reciept = await response.wait();
                if (reciept.status == 1) {
                    promise.emit('confirmed')
                } else {
                    promise.emit('declined');
                }

                resolve(newResponse(true, reciept));
            } catch (err) {
                promise.emit('error', [err]);
                reject(newResponse(false, err.message))
            }
        });

        return promise;
    }

    async burn(address_: string, amount_: string) {
        const promise = new promievent(async (resolve, reject) => {
            if (!this._checkDeployed()) {
                throw new Error("Token is not Deployed");
            }

            try {
                const amount = ethers.utils.parseEther(amount_);
                let response;
                if (address_ && address_ !== '') {
                    response = await this._token.burnFrom(`${address_}`, `${amount}`);
                } else {
                    response = await this._token.burn(`${amount}`);
                }
                promise.emit('sent', [response.hash]);

                const reciept = await response.wait();
                if (reciept.status == 1) {
                    promise.emit('confirmed')
                } else {
                    promise.emit('declined');
                }

                resolve(newResponse(true, reciept));
            } catch (err) {
                promise.emit('error', [err]);
                reject(newResponse(false, err.message))
            }
        });

        return promise;
    }

    async transfer(from_: string, to_: string, amount_: string) {
        const promise = new promievent(async (resolve, reject) => {
            if (!this._checkDeployed()) {
                throw new Error("Token is not Deployed");
            }

            try {
                const amount = ethers.utils.parseEther(amount_);
                let response;
                if (from_ && from_ !== '') {
                    response = await this._token.transferFrom(`${from_}`, `${to_}`, `${amount}`);
                } else {
                    response = await this._token.transfer(`${to_}`, `${amount}`);
                }
                promise.emit('sent', [response.hash]);

                const reciept = await response.wait();
                if (reciept.status == 1) {
                    promise.emit('confirmed')
                } else {
                    promise.emit('declined');
                }

                resolve(newResponse(true, reciept));
            } catch (err) {
                promise.emit('error', [err]);
                reject(newResponse(false, err.message))
            }
        });

        return promise;
    }

    async getBalance(address_: string) {
        const promise = new promievent(async (resolve, reject) => {
            if (!this._checkDeployed()) {
                throw new Error("Token is not Deployed");
            }

            try {
                const balance = await this._token.balanceOf(`${address_}`);

                resolve(newResponse(true, balance));
            } catch (err) {
                promise.emit('error', [err]);
                reject(newResponse(false, err.message));
            }
        });

        return promise;
    }
}



