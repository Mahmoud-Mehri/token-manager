import { UserController } from "../controller/user-controller";
import { TokenController } from "../controller/token-controller";

const userController = new UserController();
const tokenController = new TokenController();

export const userResolvers = {
  getUserById: async ({ id }) => {
    const result = await userController.findUserById(id);
    if (!!result.success) {
      return result.data;
    }
    return null;
  },
  getUserByEmail: async ({ email }) => {
    const result = await userController.findUserByEmail(email);
    if (!!result.success) {
      return result.data;
    }
    return null;
  },
  getUserAccounts: async ({ userId }) => {
    const result = await userController.getUserAccounts(userId);
    if (!!result.success) {
      return result.data;
    }
    return null;
  },
};

export const tokenResolvers = {
  getToken: async ({ id }) => {
    const result = await tokenController.findTokenById(id);
    if (!!result.success) {
      return result.data;
    }
    return null;
  },
  getUserTokens: async ({ userId }) => {
    // const result = await tokenController.
  },
};
