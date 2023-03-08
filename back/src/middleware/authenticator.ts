import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../model/general";

export const authenticator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user || req.session.user.id == 0)
    return res
      .status(ErrorCode.AuthFailed)
      .json({ success: false, data: null, message: "Authentication Failed" });

  next();
};
