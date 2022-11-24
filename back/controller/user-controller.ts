import { Token } from "../model/token";
import { Account } from "../model/account";
import { Deploy } from "../model/deploy";
import { successResponse, errorResponse, ErrorCode } from "../model/general";
import { User } from "../model/user";

export class UserController {
  constructor() {}

  async findUserById(
    _userId: number,
    _lookupUserId: number,
    includeAccounts: boolean = false,
    includeTokens: boolean = false
  ) {
    try {
      const user = await User.findByPk(_lookupUserId, {
        include:
          includeAccounts || includeTokens
            ? [
                includeAccounts ? { model: Account } : {},
                includeTokens
                  ? { model: Token, include: [{ model: Deploy }] }
                  : {},
              ]
            : [],
      });
      if (!user) return errorResponse(ErrorCode.NotFound, "User Not found!");

      return successResponse(user);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async findUserByEmail(
    _userId: number,
    _email: string,
    includeAccounts: boolean = false,
    includeTokens: boolean = false
  ) {
    try {
      const user = await User.findOne({
        where: {
          email: _email,
        },
        include:
          includeAccounts || includeTokens
            ? [
                includeAccounts ? { model: Account } : {},
                includeTokens
                  ? { model: Token, include: [{ model: Deploy }] }
                  : {},
              ]
            : [],
      });
      if (!user) return errorResponse(ErrorCode.NotFound, "User Not found!");

      return successResponse(user);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async allUsers(
    _userId: number,
    includeAccounts: boolean = false,
    includeTokens: boolean = false
  ) {
    try {
      const users = await User.findAll({
        include:
          includeAccounts || includeTokens
            ? [
                includeAccounts ? { model: Account } : {},
                includeTokens
                  ? { model: Token, include: [{ model: Deploy }] }
                  : {},
              ]
            : [],
      });
      return successResponse(users);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async getUserTokens(_userId: number, _lookupUserId: number) {
    // TO DO
    try {
      throw { message: "Under Development !" };
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async newUser(_userId: number, _userInfo: any) {
    try {
      const user = new User(_userInfo);
      await user.save();

      return successResponse(user);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async updateUser(_userId: number, _lookupUserId: number, _userInfo: any) {
    try {
      const user = await User.findByPk(_lookupUserId);
      if (!user) return errorResponse(ErrorCode.NotFound, "User Not Found!");

      const newUser = await user.update(_userInfo);
      return successResponse(newUser);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async deleteUser(_userId: number, _lookupUserId: number) {
    try {
      const rows = await User.destroy({ where: { id: _lookupUserId } });
      if (rows === 0)
        return errorResponse(ErrorCode.NotFound, "User Not Found!");

      return successResponse({}, "User deleted successfully");
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }
}
