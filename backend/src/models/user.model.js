import mongoose from "mongoose";


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
    userId: { type: mongoose.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    habits: [habitSchema],
    createdAt: { type: Date, immutable: true, default: () => Date.now() }
})

const User = mongoose.model('User', userSchema);

export default User;
