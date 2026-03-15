import { Router } from 'express';
import { getMe, refreshToken, register } from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter.post("/register", register)
authRouter.get("/me", getMe); 
authRouter.get("/refresh-token", refreshToken); 