import mongoose from "mongoose";
import Habit from "../models/habit.model.js";

mongoose.connect("mongodb://127.0.0.1:27017/mydaysdev")

const seedDB = async () => {

    try {
        console.log('clearing Database');
        await Habit.deleteMany({});
        console.log('cleared Database');
    } catch (err) {
        console.log(err.message);
    }

    try {
        console.log(`populating habits`);
        await Habit.create({ name: "Running", minutes: 35, distance: 3, createdAt: new Date("2023-11-01T21:13:30.000Z") })
        await Habit.create({ name: "Running", minutes: 42, distance: 4, createdAt: new Date("2023-11-02T21:13:30.000Z") })
        await Habit.create({ name: "Running", minutes: 28, distance: 2, createdAt: new Date("2023-11-03T21:13:30.000Z") })
        await Habit.create({ name: "Running", minutes: 52, distance: 5, createdAt: new Date("2023-11-04T21:13:30.000Z") })
        await Habit.create({ name: "Running", minutes: 31, distance: 3, createdAt: new Date("2023-11-05T21:13:30.000Z") })
        await Habit.create({ name: "Running", minutes: 44, distance: 4, createdAt: new Date("2023-11-06T21:13:30.000Z") })
        await Habit.create({ name: "Walking", minutes: 62, distance: 3, createdAt: new Date("2023-11-01T21:13:30.000Z") })
        await Habit.create({ name: "Walking", minutes: 42, distance: 2, createdAt: new Date("2023-11-02T21:13:30.000Z") })
        await Habit.create({ name: "Walking", minutes: 28, distance: 1, createdAt: new Date("2023-11-03T21:13:30.000Z") })
        await Habit.create({ name: "Walking", minutes: 73, distance: 5, createdAt: new Date("2023-11-04T21:13:30.000Z") })
        await Habit.create({ name: "Walking", minutes: 58, distance: 3, createdAt: new Date("2023-11-05T21:13:30.000Z") })
        await Habit.create({ name: "Walking", minutes: 63, distance: 4, createdAt: new Date("2023-11-06T21:13:30.000Z") })
        console.log('populating habits complete');
    } catch (err) {
        console.log(err.message);
    }

    console.log('db seeded');

}

seedDB();
