import Event from '../models/event.model.js';
import Habit from '../models/habit.model.js';

class EventServices {

    getEvents = async (habitId) => {
        try {
            const res = await Habit.findOne({ _id: habitId }, { name: 1, events: 1 }).populate('events');
            console.log(res);
            return res
        } catch (err) {
            throw err
        }
    }

    addEvent = async (newEvent) => {

        if (!newEvent || !newEvent.name || !newEvent.distance || !newEvent.minutes || !newEvent.habitId) return Promise.reject(new Error('Invalid arguments!'))

        try {
            const eventToAdd = await Event.create(newEvent);
            const habit = await Habit.findOne({ _id: newEvent.habitId });
            habit.events.push(eventToAdd._id);
            return await habit.save();
        } catch (err) {
            throw err;
        }
    }

}

export default EventServices;
