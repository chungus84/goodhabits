import mongoose from "mongoose";
import Event from "./event.model.js";

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }],
    createdAt: { type: Date, immutable: true, default: () => Date.now() }
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    habits: [habitSchema],
    createdAt: { type: Date, immutable: true, default: () => Date.now() }
})

const User = mongoose.model('User', userSchema);

export default User;
