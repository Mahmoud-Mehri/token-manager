import mongoose, { FilterQuery } from "mongoose";
import { newResponse } from "../../model/general.js";
import { IToken, Token } from "../../model/token.js";
import { User } from "../../model/user.js";

export class TokenController {

    constructor() { }

    async findTokenById(_tokenId: string, _includeUsers: boolean = false) {
        return new Promise(async (resolve, reject) => {
            try {
                let token: mongoose.Model<IToken>[];
                if (_includeUsers)
                    token = await Token.findById(_tokenId).populate('users');
                else
                    token = await Token.findById(_tokenId);
                resolve(token);
            } catch (err) {
                reject(err);
            }
        })
    }

    async findToken(filter: FilterQuery<IToken>, _includeUsers: boolean = false) {
        return new Promise(async (resolve, reject) => {
            try {
                let tokens: mongoose.Model<IToken>[];
                if (_includeUsers)
                    tokens = await Token.find(filter).populate('users');
                else
                    tokens = await Token.find(filter);
                resolve(tokens);
            } catch (err) {
                reject(err);
            }
        })
    }

    async allTokens(_includeUsers: boolean = false) {
        return new Promise(async (resolve, reject) => {
            try {
                let tokens;
                if (_includeUsers)
                    tokens = await Token.find({}).populate('users');
                else
                    tokens = await Token.find({});
                resolve(tokens);
            } catch (err) {
                reject(err);
            }
        })
    }

    async newToken(_token: object) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = new Token(_token);
                await token.save();
                resolve(token);
            } catch (err) {
                reject(err)
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
                resolve(token);
            } catch (err) {
                reject(err);
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
                reject(err);
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

                resolve('User added successfully')
            } catch (err) {
                reject(err);
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