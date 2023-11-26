import mongoose from 'mongoose';
import Event from './event.model.js';

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }],
    createdAt: { type: Date, immutable: true, default: () => Date.now() }
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
