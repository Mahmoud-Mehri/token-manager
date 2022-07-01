import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import redis from 'ioredis';
import mongoose from 'mongoose';
import { User } from '../../model/user';
import { newResponse } from '../../model/general';
import * as config from '../../config.json';


export class AuthController {

    async registerUser(userInfo) {
        return new Promise(async (resolve, reject) => {
            try {
                const newUser = new User(userInfo);
                newUser.password = bcrypt.hashSync(userInfo.password, 10);

                await newUser.save();
                resolve(newResponse(true, newUser));
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        });
    }

    async loginUser(loginInfo) {
        return new Promise(async (resolve, reject) => {
            try {
                const loginData = {
                    user: loginInfo.userName,
                    timestamp: new Date()
                };
                jwt.sign(loginData, config.auth.jwtSecret)

            } catch (err) {
                reject(newResponse(false, err.message));
            }
        });
    }

    async verifyToken(token: string) {

    }

} 