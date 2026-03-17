import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const authRouter = Router();

authRouter.post("/register", authController.register)
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/login", authController.login);
authRouter.get("/profile", authMiddleware, authController.profile);
authRouter.post("/logout", authMiddleware, authController.logout);