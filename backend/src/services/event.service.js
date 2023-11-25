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

}

export default EventServices;
