import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, default: (() => Date.now()) },
    minutes: { type: Number, required: true },
    distance: { type: Number, required: true }
})

const Event = mongoose.model('Event', eventSchema);

export default Event;
