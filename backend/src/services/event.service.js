import Event from '../models/event.model.js';
import Habit from '../models/habit.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

class EventServices {

    getEvents = async (habitId) => {
        try {

            const objId = new mongoose.Types.ObjectId(habitId.userId)
            const res = await User.findOne({ userId: objId, "habits._id": habitId.habitId }, { "habits.name": 1, "habits._id": 1, "habits.events": 1 }).populate("habits.events")
            // console.log(res);
            return res
        } catch (err) {
            throw err
        }
    }

    addEvent = async (newEvent) => {


        if (!newEvent || !newEvent.name || !newEvent.distance || !newEvent.minutes || !newEvent.habitId) return Promise.reject(new Error('Invalid arguments!'))

        try {
            const eventToAdd = await Event.create(newEvent);

            const user = await User.updateOne({ "habits._id": newEvent.habitId }, {
                $push: {
                    "habits.$.events": { _id: eventToAdd._id }
                }
            })

            return user


        } catch (err) {
            throw err;
        }
    }

}

export default EventServices;
