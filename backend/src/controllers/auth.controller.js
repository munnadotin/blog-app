import { userModel } from "../models/auth.model.js";
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const isVaildUser = await userModel.findOne({ email });

        if (isVaildUser) {
            return res.status(422).json({
                message: "User already exists with this email"
            })
        }

        const user = await userModel.create({
            name,
            email,
            password
        })

        // accessToken
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "15m"
        });

        // refreshToken
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        });

        res.status(201).json({
            message: "User register successfully",
            user: {
                userId: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export async function getMe(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decode.id);

        res.status(200).json({
            message: "User found successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export async function refreshToken(req, res) {
    try {
        const { refreshToken } = req.cookies;
        // console.log(refreshToken)
        if (!refreshToken) {
            return res.status(401).json({
                message: "Token missing"
            })
        }

        const decode = jwt.sign(refreshToken, process.env.JWT_SECRET);

        const accessToken = jwt.sign({ id: decode.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        const newRefreshToken = jwt.sign({ id: decode.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("refreshToken", newRefreshToken); 
        
        res.status(200).json({
            message: "Access token refreshed successfully",
            accessToken
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}