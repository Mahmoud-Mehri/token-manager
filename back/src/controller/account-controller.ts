import { Account } from "../model/account";
import { successResponse, errorResponse, ErrorCode } from "../model/general";

export class AccountController {
  constructor() {}

  async findAccountById(_userId: number, _accountId: number) {
    try {
      const account = await Account.findByPk(_accountId);
      if (!account)
        return errorResponse(ErrorCode.NotFound, "Account Not Found!");

      if (account.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this account"
        );

      return successResponse(account);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async findAccountByAddress(_userId: number, _address: string) {
    try {
      const account = await Account.findOne({
        where: {
          address: _address,
        },
      });
      if (!account)
        return errorResponse(ErrorCode.NotFound, "Account Not found!");

      return successResponse(account);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async allAccounts(_userId: number) {
    try {
      const users = await Account.findAll({
        where: {
          userId: _userId,
        },
      });

      return successResponse(users);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async addNewAccount(_userId: number, _accountInfo: any) {
    try {
      const acc = await Account.findOne({
        where: {
          address: _accountInfo.address,
          userId: _userId,
        },
      });

      if (acc && acc.address === _accountInfo.address)
        return errorResponse(
          ErrorCode.Conflict,
          "Account address is duplicate!"
        );

      _accountInfo.userId = _userId;
      const account = new Account(_accountInfo);
      const newAccount = await account.save();

      return successResponse(newAccount);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async updateAccount(_userId: number, _accountId: number, _accountInfo: any) {
    try {
      const account = await Account.findByPk(_accountId);
      if (!account)
        return errorResponse(ErrorCode.NotFound, "Account Not Found!");

      if (account.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this account!"
        );

      const newAccount = await account.update(_accountInfo);
      return successResponse(newAccount);
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async deleteAccount(_userId: number, _accountId: number) {
    try {
      const account = await Account.findByPk(_accountId);
      if (!account)
        return errorResponse(ErrorCode.NotFound, "Account Not Found!");

      if (account.userId !== _userId)
        return errorResponse(
          ErrorCode.AccessDenied,
          "You don't have access to this account!"
        );

      account.destroy();

      return successResponse({}, "Account deleted successfully");
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }
}
