import { Request, Response, NextFunction, Errback } from "express";

export const errorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: "false", message: "Route Not Found!" });
};
