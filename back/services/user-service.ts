import express, { urlencoded } from "express";
import cookieparser from "cookie-parser";

import { userRouter } from "../api/routes/user-routes";
import { authenticator } from "../api/middleware/authenticator";

const userServiceApp = express();

userServiceApp.use(cookieparser());
userServiceApp.use(urlencoded({ extended: true }));
userServiceApp.use(express.json({ limit: "200k" }));

userServiceApp.use(authenticator);
userServiceApp.use(userRouter);
