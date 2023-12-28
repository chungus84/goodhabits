import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: { type: String, required: true }
});

const Token = new mongoose.model('Token', tokenSchema);
export default Token;
