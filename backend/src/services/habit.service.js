import Profile from "../models/profile.model.js";
import mongoose from 'mongoose';

class HabitServices {

    // getHabits = async () => {
    //     try {
    //         const res = await Habit.find({});

    //         return res;
    //     } catch (err) {

    //         throw err
    //     }
    // }

    addHabit = async (newHabit) => {


        if (!newHabit || !newHabit.name) return Promise.reject(new Error('Invalid arguments'))
        const objId = new mongoose.Types.ObjectId(newHabit.userId)
        const userHabit = await Profile.findOne({ userId: objId, "habits.name": newHabit.name })

        if (userHabit) return Promise.reject(new Error('This habit already exists'))
        try {
            const res = await Profile.updateOne({ userId: objId }, { $push: { habits: { name: newHabit.name, type: newHabit.type, createdAt: newHabit.createdAt } } });
            return res;

        } catch (err) {

            throw err
        }
    }

}

export default HabitServices;
