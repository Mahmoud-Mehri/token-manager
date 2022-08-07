import { NextFunction, Request, Response } from "express";
import { newResponse } from "../model/general";
import { AuthController } from "../controller/auth-controller";
import { User } from "../model/user";

export function authenticator(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    User.findOne({ where: { email: req.session.user.getDataValue("email") } })
      .then((user) => {
        if (user) {
          delete user.password;
          req.session.user = user;
          next();
        } else {
          res.status(401).json(newResponse(false, "Authorization Failed!"));
        }
      })
      .catch((err) => {
        res
          .status(401)
          .json(
            newResponse(
              false,
              `Authorization failed with error:\n${err.message}`
            )
          );
      });
  } else {
    res.status(401).json(newResponse(false, "Authorization Failed!"));
  }
}
