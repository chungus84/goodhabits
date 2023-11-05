import Habit from "../models/habit.model.js";

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
        try {

            return await Habit.create(newHabit);

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
