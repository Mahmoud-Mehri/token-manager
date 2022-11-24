import { User } from "../model/user";
import {
  successResponse,
  errorResponse,
  ErrorCode,
  removePassword,
  ControllerResponse,
} from "../model/general";
import { Sequelize } from "sequelize";

export class AuthController {
  constructor() {}

  async registerUser(userInfo: any): Promise<ControllerResponse> {
    try {
      let userCount = await User.count({
        where: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("email")),
          "=",
          (userInfo.email as string).toLowerCase()
        ),
      });

      if (userCount > 0)
        return errorResponse(
          ErrorCode.Conflict,
          "This Email address is already registered"
        );

      const user = new User(userInfo);
      const newUser = await user.save();

      return successResponse(removePassword(newUser.get({ plain: true })));
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async loginUser(loginInfo: any): Promise<ControllerResponse> {
    try {
      const user = await User.findOne({
        where: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("email")),
          "=",
          (loginInfo.email as string).toLowerCase()
        ),
      });

      if (user) {
        if (await user.validatePassword(loginInfo.password)) {
          return successResponse(user.get({ plain: true }));
        }
      }

      return errorResponse(
        ErrorCode.AuthFailed,
        "Email or Password is not correct"
      );
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }

  async logout(_userId: number): Promise<ControllerResponse> {
    try {
      // clear logs
      return successResponse({}, "Successfully logged out");
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }
}
