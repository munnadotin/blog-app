import jwt from 'jsonwebtoken';

export async function authMiddleware(req, res, next) {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decode;

        next();

    } catch (error) {
        res.status(500).json({
            message: "Invalid or expire token",
            error: error.message
        })
    }
}