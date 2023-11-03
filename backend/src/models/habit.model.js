import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, immutable: true, default: () => Date.now() }
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
