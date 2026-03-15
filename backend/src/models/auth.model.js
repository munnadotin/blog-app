import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required to create an account"]
    },
    email: {
        type: String,
        required: [true, "email is required to create an account"],
        unique: [true, "email is must be unique"],
        match: [/\S+@\S+\.\S+/, "email is not valid"]
    },
    password: {
        type: String,
        required: [true, "password is required to create an account"],
        minLength: [6, "password must be at least 6 characters long"], 
        select: false
    }
});


userSchema.pre("save", async function () {
    if (!this.isModified(this.password)) {
        const hashPass = await bcrypt.hash(this.password, 10); 
        this.password = hashPass;
    }
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password); 
}

export const userModel = mongoose.model("user", userSchema);