import express, { urlencoded } from "express";
import { userRouter } from "../api/routes/user-routes";

const userServiceApp = express();

userServiceApp.use(urlencoded({ extended: true }));
userServiceApp.use(express.json({ limit: '200k' }));

userServiceApp.use(userRouter);