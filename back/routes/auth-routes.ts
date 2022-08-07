import { Router } from "express";
import { AuthController } from "../controller/auth-controller";

export const authRouter = Router();

const authController = new AuthController();

authRouter.post("/register", async (req, res) => {
  const { success, data } = await authController.registerUser(req.body);
  if (success) {
    res.status(200).json({ success, data });
  } else {
    res.status(500).json({ success, data });
  }
});

authRouter.post("/login", async (req, res) => {
  const loginInfo = req.body;
  const { success, data } = await authController.loginUser(loginInfo);
  if (success) {
    delete data.password;
    req.session.user = data;
    res.status(200).json({ success, data });
  } else {
    res.status(401).json({ success, data });
  }
});
