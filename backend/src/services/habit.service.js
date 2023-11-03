import Habit from "../models/habit.model.js";

class HabitServices {

    getHabits = async () => {
        try {
            return await Habit.find({});
        } catch (err) {
            return {
                status: 404,
                error: err.message
            }


        }
    }

}

export default HabitServices;
