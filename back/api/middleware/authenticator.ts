import { NextFunction, Request, Response } from 'express';
import { newResponse } from '../../model/general';
import { AuthController } from '../controller/auth-controller';

export function authenticator(req: Request, res: Response, next: NextFunction) {

    const authController = new AuthController();

    if (!req.session['userToken'])

        if (req.headers && req.headers.authorization) {
            const [name, token] = req.headers.authorization.split(' ');
            if (name.toUpperCase() != 'TOKEN')
                res.status(400).json(newResponse(false, "Authorization Failed!"))
            else {
                authController.verifyToken(token);
                next()
            }
        } else {
            res.status(400).json(newResponse(false, "Authorization Failed!"));
        }
}