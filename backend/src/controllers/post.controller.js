import { uploadToImageKit } from "../config/imagekit.js";


export async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "File not found" });
        }

        const result = await uploadToImageKit(req.file);

        res.json({
            result
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", 
            error: error.message
        })
    }
}   