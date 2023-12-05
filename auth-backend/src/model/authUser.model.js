import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() }
})

const AuthUser = new mongoose.model("AuthUser", authUserSchema);

export default AuthUser;
