import { Router } from 'express';
import { login, refreshToken, register, profile, logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const authRouter = Router();

authRouter.post("/register", register)
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/login", login);
authRouter.get("/profile", authMiddleware, profile);
authRouter.post("/logout", authMiddleware, logout); 