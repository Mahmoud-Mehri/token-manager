import { Router } from "express";
import { authenticator } from "../middleware/authenticator";

export const authRouter = Router();

authRouter.use(authenticator);

authRouter.post('/register', (req, res) => {

})

authRouter.post('/login', (req, res) => {

})