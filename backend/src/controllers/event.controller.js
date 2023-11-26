import EventServices from "../services/event.service.js";
import HabitServices from "../services/habit.service.js";

const eventServices = new EventServices();

class EventControllers {
    getAllEvents = async (req, res) => {
        try {
            const events = await HabitServices.getEvents();
            res.status(200).json(events);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}


export default EventControllers;
