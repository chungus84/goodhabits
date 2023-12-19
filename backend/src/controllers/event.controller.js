import EventServices from "../services/event.service.js";
import HabitServices from "../services/habit.service.js";

const eventServices = new EventServices();

class EventControllers {
    getAllEvents = async (req, res) => {
        try {
            const events = await eventServices.getEvents(req.query);
            res.status(200).json(events);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    addEvent = async (req, res) => {
        try {
            const newEvent = await eventServices.addEvent(req.body)
            res.status(201).json(newEvent);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}


export default EventControllers;
