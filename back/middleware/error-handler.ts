import { Errback, NextFunction, Request, Response } from "express";
import { newResponse } from "../model/general";

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json(newResponse(false, "Route Not Found!"));
};

export const errorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {};
