import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRouter } from './routes/auth.route.js';

export const app = express();

/**
 * @description middlewares
 */
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLEINT_URL,
    credentials: true
}))

/**
 * @description Auth routes
 * @route /api/auth/
 */

app.use("/api/auth", authRouter); 