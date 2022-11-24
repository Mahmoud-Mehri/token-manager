import { Router } from "express";
import { AuthController } from "../controller/auth-controller";
import {
  ErrorCode,
  errorResponse,
  removeErrorCode,
  successResponse,
} from "../model/general";

export const authRouter = Router();

const authController = new AuthController();

authRouter.post("/register", async (req, res) => {
  const userInfo = req.body;
  authController.registerUser(userInfo).then((result) => {
    if (result.success) {
      const authUser = {
        id: result.data.id,
        email: result.data.email,
        userType: result.data.userType,
        accessCode: result.data.accessCode,
        accessKey: result.data.accessKey,
      };

      return req.session.regenerate((err) => {
        if (err) {
          const newResult = errorResponse(ErrorCode.Exception, err.message);

          return res
            .status(newResult.errorCode)
            .json(removeErrorCode(newResult));
        }

        req.session.user = authUser;
        result.data = { email: authUser.email, userType: authUser.userType };
        return res.status(result.errorCode).json(removeErrorCode(result));
      });
    }

    res.status(result.errorCode).json(removeErrorCode(result));
  });
});

authRouter.post("/login", async (req, res) => {
  const loginInfo = req.body;
  authController.loginUser(loginInfo).then((result) => {
    if (result.success) {
      const authUser = {
        id: result.data.id,
        email: result.data.email,
        userType: result.data.userType,
        accessCode: result.data.accessCode,
        accessKey: result.data.accessKey,
      };

      return req.session.regenerate((err) => {
        if (err) {
          const newResult = errorResponse(ErrorCode.Exception, err.message);

          return res
            .status(newResult.errorCode)
            .json(removeErrorCode(newResult));
        }

        req.session.user = authUser;
        result.data = { email: authUser.email, userType: authUser.userType };

        return res.status(result.errorCode).json(removeErrorCode(result));
      });
    }

    res.status(result.errorCode).json(removeErrorCode(result));
  });

  authRouter.post("/logout", (req, res) => {
    if (req.session.user) {
      const userId = req.session.user?.id;
      authController.logout(userId).then((result) => {
        if (result.success) {
          req.session.user = undefined;
          return req.session.regenerate((err) => {
            if (err) {
              const newResult = errorResponse(ErrorCode.Exception, err.message);

              return res
                .status(newResult.errorCode)
                .json(removeErrorCode(newResult));
            }

            return res.status(result.errorCode).json(removeErrorCode(result));
          });
        }

        return res.status(result.errorCode).json(removeErrorCode(result));
      });
    } else {
      const result = successResponse({});
      return res.status(result.errorCode).json(removeErrorCode(result));
    }
  });
});
