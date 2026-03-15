import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`connction establised successfully with DB`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}