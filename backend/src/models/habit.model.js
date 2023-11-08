import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    minutes: { type: Number, required: true },
    distance: { type: Number, default: 0 },
    createdAt: { type: Date, immutable: true, default: () => Date.now() }
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
