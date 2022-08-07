import { User } from "../model/user";
import { newResponse } from "../model/general";

export class AuthController {
  async registerUser(userInfo: any) {
    try {
      const newUser = new User(userInfo);
      await newUser.save();
      return newResponse(true, newUser);
    } catch (err) {
      return newResponse(false, err.message);
    }
  }

  async loginUser(loginInfo: any) {
    try {
      const user = await User.findOne({
        where: {
          email: loginInfo.email,
        },
      });
      if (user) {
        if (await user.validatePassword(loginInfo.password)) {
          return newResponse(true, user);
        }
        return newResponse(false, "Authentication Failed!");
      }
      return newResponse(false, "Authentication Failed!");
    } catch (err) {
      return newResponse(false, err.message);
    }
  }
}
