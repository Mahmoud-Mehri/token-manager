import express, { json, urlencoded } from "express";
import cookieparser from "cookie-parser";

import { userRouter } from "../routes/user-routes";
import { authenticator } from "../middleware/authenticator";

const userServiceApp = express();

userServiceApp.use(cookieparser());
userServiceApp.use(urlencoded({ extended: true }));
userServiceApp.use(json({ limit: "200k" }));

userServiceApp.use(authenticator);
userServiceApp.use(userRouter);

export default userServiceApp;
