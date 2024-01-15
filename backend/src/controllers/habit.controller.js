import HabitServices from "../services/habit.service.js";

const habitServices = new HabitServices();


class HabitControllers {

    addHabit = async (req, res) => {
        try {
            const newHabit = await habitServices.addHabit(req.body)
            res.status(201).json(newHabit);
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

export default HabitControllers;
