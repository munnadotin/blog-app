import axios from "axios";
import toast from "react-hot-toast";

export async function apiHandler<T>(promise: Promise<{ data: T }>): Promise<T> {
    try {
        const res = await promise;
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data || error.message || "Something went wrong";
            toast.error(message);
            throw new Error(message);
        }
        throw error;
    }
}
