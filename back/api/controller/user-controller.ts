import { FilterQuery } from 'mongoose';
import { newResponse } from '../../model/general';
import { IUser, User } from '../../model/user';

export class UserController {

    constructor() {

    }

    async findUserById(_userId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(_userId);
                if (user)
                    resolve(user);
                else
                    throw new Error("User Not Found");
            } catch (err) {
                reject(err);
            }
        })
    }

    async findUser(filter: FilterQuery<IUser>) {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await User.find(filter);
                resolve(users);
            } catch (err) {
                reject(err);
            }
        })
    }

    async allUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await User.find({});
                resolve(users);
            } catch (err) {
                reject(err);
            }
        })
    }

    async newUser(_user) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = new User(_user);
                await user.save();
                resolve(user);
            } catch (err) {
                reject(err)
            }
        })
    }

    async updateUser(_userId, _user) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(_userId);
                if (!user)
                    throw new Error("User Not Found");

                user.set(_user);
                await user.save();
                resolve(user);
            } catch (err) {
                reject(err);
            }
        })
    }

    async deleteUser(_userId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                if (await User.deleteOne({ _id: _userId }))
                    resolve(newResponse(true, "User deleted successfully"))
                else
                    throw new Error('User Not found');
            } catch (err) {
                reject(newResponse(false, err.message));
            }
        })
    }
}