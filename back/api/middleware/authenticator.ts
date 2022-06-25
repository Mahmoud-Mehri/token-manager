import { NextFunction, Request, Response } from 'express';

export function authenticator(req: Request, res: Response, next: NextFunction) {

    // ...
    next();
}