import HabitServices from "../services/habit.service.js";

const habitServices = new HabitServices();


class HabitControllers {
    getAllHabits = async (req, res) => {
        try {
            const habits = await habitServices.getHabits();
            // console.log(habits);

            res.status(200).json(habits)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    addHabit = async (req, res) => {
        try {
            // console.log(req.body);

            const newHabit = await habitServices.addHabit(req.body)
            // console.log(newHabit);
            res.status(201).json(newHabit);
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

export default HabitControllers;
