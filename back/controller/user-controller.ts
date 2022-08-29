import { newResponse } from "../model/general";
import { User } from "../model/user";

export class UserController {
  constructor() {}

  async findUserById(
    _userId: number,
    includeAccounts: boolean = false,
    includeTokens: boolean = false
  ) {
    try {
      const user = await User.findByPk(_userId);
      if (user) return newResponse(true, user);
      else throw new Error("User Not Found");
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async findUserByEmail(
    _email: string,
    includeAccounts: boolean = false,
    includeTokens: boolean = false
  ) {
    try {
      const user = await User.findOne({
        where: {
          email: _email,
        },
      });
      if (user) return newResponse(true, user);
      throw new Error("User Not Found");
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async allUsers(
    includeAccounts: boolean = false,
    includeTokens: boolean = false
  ) {
    try {
      const users = await User.findAll({});
      return newResponse(true, users);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async getUserAccounts(_userId: number) {
    // TO DO
    try {
      throw { message: "Under Development !" };
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async getUserTokens(_userId: number) {
    // TO DO
    try {
      throw { message: "Under Development !" };
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async newUser(_userInfo: any) {
    try {
      const user = new User(_userInfo);
      await user.save();
      return newResponse(true, user);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async updateUser(_userId: number, _userInfo: any) {
    try {
      const user = await User.findByPk(_userId);
      if (!user) throw new Error("User Not Found");
      await user.update(_userInfo);
      return newResponse(true, user);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async deleteUser(_userId: number) {
    try {
      const rows = await User.destroy({ where: { id: _userId } });
      if (rows > 0) return newResponse(true, "User deleted successfully");
      throw new Error("User Not found");
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async addNewAccount(
    _userId: number,
    accountAddr: string,
    accountPrivateKey: string = ""
  ) {
    try {
    } catch (err) {}
  }
}
