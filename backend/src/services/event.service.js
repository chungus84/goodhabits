import Event from '../models/event.model.js';

class EventServices {

    getEvents = async () => {
        try {
            const res = await Event.find({});
            return res
        } catch (err) {
            throw err
        }
    }

    addEvent = async (newEvent) => {
        if (!newEvent || !newEvent.name || !newEvent.distance || !newEvent.minutes) return Promise.reject(new Error('Invalid arguments!'))

        try {
            return await Event.create(newEvent);
        } catch (err) {
            throw err;
        }
    }

}

export default EventServices;
