import mongoose from "mongoose";
import Habit from "../models/habit.model.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";

mongoose.connect("mongodb://127.0.0.1:27017/mydaysdev")

const seedDB = async () => {

    const runningArray = [
        { name: "Running", minutes: 52, distance: 4, date: new Date("2023-10-30") },
        { name: "Running", minutes: 40, distance: 3, date: new Date("2023-10-31") },
        { name: "Running", minutes: 45, distance: 3.5, date: new Date("2023-11-01") },
        { name: "Running", minutes: 60, distance: 5, date: new Date("2023-11-02") },
        { name: "Running", minutes: 38, distance: 3, date: new Date("2023-11-03") },
        { name: "Running", minutes: 47, distance: 4, date: new Date("2023-11-04") },
        { name: "Running", minutes: 65, distance: 5, date: new Date("2023-11-05") },

    ]

    const walkingArray = [
        { name: "Walking", minutes: 64, distance: 3.7, date: new Date("2023-10-30") },
        { name: "Walking", minutes: 58, distance: 3, date: new Date("2023-10-31") },
        { name: "Walking", minutes: 76, distance: 4.8, date: new Date("2023-11-01") },
        { name: "Walking", minutes: 57, distance: 4.3, date: new Date("2023-11-02") },
        { name: "Walking", minutes: 59, distance: 3, date: new Date("2023-11-03") },
        { name: "Walking", minutes: 76, distance: 5.3, date: new Date("2023-11-04") },
        { name: "Walking", minutes: 69, distance: 5, date: new Date("2023-11-05") },

    ]

    const user = {
        firstName: "Kenichi",
        lastName: "Beveridge",
        userName: "Chungus",
        email: "test@testing.com",
        password: "password",
        repeatedPassword: "password",
        createdAt: new Date("2023-10-01")
    }

    let dbUser;

    try {
        console.log('clearing Database');
        await Habit.deleteMany({});
        await Event.deleteMany({});
        await User.deleteMany({})

        console.log('cleared Database');
    } catch (err) {
        console.log(err.message);
    }
    try {
        console.log("creating user");
        dbUser = await User.create(user);

    } catch (err) {
        console.log(err.message);
    }



    try {
        console.log(`populating habits`);
        await dbUser.habits.push({ name: "Running", type: "cardio", createdAt: new Date("2023-10-01") })

        await dbUser.habits.push({ name: "Walking", type: "cardio", createdAt: new Date("2023-10-01") })

        await dbUser.save()
        console.log('populating habits complete');
    } catch (err) {
        console.log(err.message);
    }

    try {
        console.log('populating running events');
        // console.log(dbUser);



        runningArray.forEach(async event => {
            const newEvent = await Event.create(event)
            console.log(newEvent._id);
            const userHabits = await User.updateOne({ _id: dbUser._id, "habits.name": "Running" }, { $push: { "habits.$.events": { _id: newEvent._id } } })

            // await userHabits.save()


        });

        walkingArray.forEach(async event => {
            const newEvent = await Event.create(event)
            console.log(newEvent._id);
            const userHabits = await User.updateOne({ _id: dbUser._id, "habits.name": "Walking" }, { $push: { "habits.$.events": { _id: newEvent._id } } })
            // await userHabits.save()
        })

    } catch (err) {
        console.log(err.message);
    }

    console.log('db seeded');

}

seedDB();
