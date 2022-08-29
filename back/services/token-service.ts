import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";

import { tokenRouter } from "../routes/token-routes";
import { authenticator } from "../middleware/authenticator";

const tokenServiceApp = express();

tokenServiceApp.use(cookieParser());
tokenServiceApp.use(urlencoded({ extended: true }));
tokenServiceApp.use(json({ limit: "200k" }));

tokenServiceApp.use(authenticator);
tokenServiceApp.use(tokenRouter);

export default tokenServiceApp;
