import { ImageKit } from "@imagekit/nodejs/client.js";

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export const uploadToImageKit = async (file) => {
    try {
        const response = await client.files.upload({
            file: file.buffer.toString("base64"),
            fileName: file.originalname
        });
        return response.url;
    } catch (error) {
        console.error("ImageKit error:", error);
        throw error;
    }
};