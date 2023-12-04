import User from "../models/user.model.js";

class HabitServices {

    getHabits = async () => {
        try {
            const res = await Habit.find({});
            // console.log(res);
            return res;
        } catch (err) {
            // return {
            //     status: 404,
            //     error: err.message
            // }
            throw err
        }
    }

    addHabit = async (newHabit) => {



        if (!newHabit || !newHabit.name) return Promise.reject(new Error('Invalid arguments'))
        const userHabit = await User.findOne({ _id: newHabit.userId, "habits.name": newHabit.name })

        if (userHabit) return Promise.reject(new Error('This habit already exists'))
        try {

            const res = await User.updateOne({ _id: newHabit.userId }, { $push: { habits: { name: newHabit.name, type: newHabit.type, createdAt: newHabit.createdAt } } });
            // console.log(res);
            return res;

        } catch (err) {

            // return {
            //     status: 400,
            //     error: err.message
            // }
            throw err
        }
    }

}

export default HabitServices;
