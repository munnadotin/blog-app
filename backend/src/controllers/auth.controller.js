import { userModel } from "../models/auth.model.js";
import jwt from 'jsonwebtoken';

/**
 * @description Register user
 * @route POST /api/auth/register
 * @access public
 */
async function register(req, res) {
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

        user.refreshToken = refreshToken;
        await user.save();

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

/**
 * @description Refresh access token
 * @route POST /api/auth/refresh-token
 * @access public
 */
async function refreshToken(req, res) {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Token missing"
            })
        }

        const decode = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const user = await userModel.findById(decode.id).select("+refreshToken");

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Invalid refresh token"
            })
        }

        const accessToken = jwt.sign({ id: decode.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        const newRefreshToken = jwt.sign({ id: decode.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Access token refreshed successfully",
            accessToken, 
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

/**
 * @description Login user
 * @route POST /api/auth/login
 * @access public
 */
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email or password is required"
            })
        }

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        });

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.status(200).json({
            message: "User fetched successfully",
            user: {
                id: user._id,
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
/**
 * @description Get user profile
 * @route GET /api/auth/profile
 * @access private
 */
async function profile(req, res) {
    try {
        const id = req.user.id;

        if (!id) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const user = await userModel.findById(id);

        res.status(200).json({
            message: "user found successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

/**
 * @description Logout user
 * @route POST /api/auth/logout
 * @access private
 */
async function logout(req, res) {
    try {
        res.clearCookie("refreshToken");

        const user = await userModel.findById(req.user.id);

        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.status(200).json({
            message: "Logged out successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const authController = {
    register,
    refreshToken,
    login,
    profile,
    logout
}; 