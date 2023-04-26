import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../model/general";
import { redisClient } from "../db-connection";

export const loadFromCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.session.user.id;
  const userToken = req.headers["token"];
  const requestName = req.originalUrl + req.params;
  const eTag = req.headers["if-none-match"];
  if (eTag) {
    const storedTag = await redisClient.get("eTag");
    if (storedTag && eTag === storedTag) {
      res.set("etag", eTag);
      return res.status(ErrorCode.NotModified).json("");
    } else {
    }
  } else {
    next();
  }
};
