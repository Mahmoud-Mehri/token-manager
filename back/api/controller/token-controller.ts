import mongoose, { FilterQuery } from "mongoose";
import { newResponse } from "../../model/general";
import { IToken, Token } from "../../model/token";
import { User } from "../../model/user";
import { ERC20Controller } from "../../tokens/controller/erc20-controller";
import { ERC721Controller } from "../../tokens/controller/erc721-controller";

export class TokenController {

    private _erc20Controller: ERC20Controller;
    private _erc721Controller: ERC721Controller;

    constructor() { }

    async findTokenById(_tokenId: string, _includeUser: boolean = false) {
        return new Promise(async (resolve, reject) => {
            try {
                let token: mongoose.Model<IToken>[];
                if (_includeUser)
                    token = await Token.findById(_tokenId).populate('user');
                else
                    token = await Token.findById(_tokenId);
                resolve(newResponse(true, token));
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        })
    }

    async findToken(filter: FilterQuery<IToken>, _includeUser: boolean = false) {
        return new Promise(async (resolve, reject) => {
            try {
                let tokens: mongoose.Model<IToken>[];
                if (_includeUser)
                    tokens = await Token.find(filter).populate('user');
                else
                    tokens = await Token.find(filter);
                resolve(newResponse(true, tokens));
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        })
    }

    async allTokens(_includeUser: boolean = false) {
        return new Promise(async (resolve, reject) => {
            try {
                let tokens;
                if (_includeUser)
                    tokens = await Token.find({}).populate('user');
                else
                    tokens = await Token.find({});
                resolve(newResponse(true, tokens));
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        })
    }

    async newToken(_token: object) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = new Token(_token);
                await token.save();
                resolve(newResponse(true, token));
            } catch (err) {
                reject(newResponse(false, err.message))
            }
        })
    }

    async updateToken(_tokenId: string, _token: object) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = await Token.findById(_tokenId);
                if (!token)
                    throw new Error("Token Not Found");

                token.set(_token);
                await token.save();
                resolve(newResponse(true, token));
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        })
    }

    async deleteToken(_tokenId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                if (await Token.deleteOne({ _id: _tokenId }))
                    resolve(newResponse(true, "Token deleted successfully"))
                else
                    reject(newResponse(false, "Token not exists!"))
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        })
    }

    async getTokenUser(_tokenId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = await Token.findById(_tokenId);
                if (!token)
                    throw new Error('Token Not Found');

                const user = await User.find({ _id: token.user });
                resolve(newResponse(true, user));
            } catch (err) {
                reject(newResponse(false, err.message))
            }
        })
    }

    async getTokenAccounts(_tokenId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = await Token.findById(_tokenId);
                if (!token)
                    throw new Error('Token Not Found');

                const accounts = Array.from(token.accounts);
                resolve(newResponse(true, accounts));
            } catch (err) {
                reject(newResponse(false, err.message))
            }
        })
    }

    async addAccountToToken(_tokenId: string, _account: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = await Token.findByIdAndUpdate(
                    _tokenId,
                    { $push: { "accounts": _account } },
                    { new: true }
                );

                resolve(newResponse(false, "Account added successfully"))
            } catch (err) {
                reject(newResponse(false, err.message));
            }

        })
    }

    async mintToken(_tokenId: string, _accountAddr: string) {
        return new Promise((resolve, reject) => {

        })
    }

    async burnToken(_tokenId: string, _accountAddr: string) {
        return new Promise((resolve, reject) => {

        })
    }


}