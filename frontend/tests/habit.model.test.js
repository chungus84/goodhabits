import HabitModel from "../src/Components/utils/habit.model.js";
describe('Habit Model Test', () => {
    test('should create the object when constructor is called', () => {
        const [_id, name, minutes, distance, createdAt] = [123, "New Habit", 3, 4, Date("2023-11-05T16:05: 32.299Z")]

        const testHabit = new HabitModel(_id, name, minutes, distance, createdAt);

        expect(testHabit._id).toBe(_id);
        expect(testHabit.name).toBe(name);
        expect(testHabit.minutes).toBe(minutes);
        expect(testHabit.distance).toBe(distance);
        expect(testHabit.createdAt).toBe(createdAt)
    });
    test('should create not create Peep without fields', () => {
        const [_id, name] = [null, "New Habit"]

        const testHabit = new HabitModel(_id, name);
        expect(testHabit._id).toBe(_id);

    });
})
