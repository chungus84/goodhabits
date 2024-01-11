import User from "../models/profile.model.js";
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

        console.log(newHabit);


        if (!newHabit || !newHabit.name) return Promise.reject(new Error('Invalid arguments'))
        const objId = new mongoose.Types.ObjectId(newHabit.userId)
        console.log(objId);
        const userHabit = await User.findOne({ userId: objId, "habits.name": newHabit.name })

        if (userHabit) return Promise.reject(new Error('This habit already exists'))
        try {

            const res = await User.updateOne({ userId: objId }, { $push: { habits: { name: newHabit.name, type: newHabit.type, createdAt: newHabit.createdAt } } });
            console.log(res);
            return res;

        } catch (err) {

            throw err
        }
    }

}

export default HabitServices;
