import * as helper from '../src/Components/utils/helper'
import { parseISO } from 'date-fns';

describe('tests the helper functions in helper.js', () => {
    describe('calcMetric', () => {
        test('should calculate a specific metric given an array of objects', () => {
            const testHabitArray = [
                { name: "Running", minutes: 52, distance: 3, createdAt: new Date("2023-11-01T21:13:30Z") },
                { name: "Running", minutes: 20, distance: 1, createdAt: new Date("2023-11-01T21:13:30Z") },
                { name: "Running", minutes: 30, distance: 2, createdAt: new Date("2023-11-01T21:13:30Z") }
            ]

            expect(helper.calcMetric(testHabitArray, "minutes")).toBe(102);
            expect(helper.calcMetric(testHabitArray, "distance")).toBe(6);
        })
    });

    describe('cardNames', () => {
        test('should return an array of unique habit names', () => {
            const testHabitArray = [
                { name: "Running", minutes: 52, distance: 3 },
                { name: "Running", minutes: 20, distance: 1 },
                { name: "Running", minutes: 30, distance: 2 },
                { name: "Walking", minutes: 50, distance: 3 },
                { name: "Walking", minutes: 42, distance: 2 }

            ]

            const result = helper.cardNames(testHabitArray);

            expect(result.length).toBe(2);
        });
    });

    describe('buildChartArray tests', () => {
        test('should return an array of specific metric', () => {
            const testHabitArray = [
                { name: "Running", minutes: 52, distance: 3, createdAt: new Date("2023-11-01T21:13:30Z") },
                { name: "Running", minutes: 20, distance: 1, createdAt: new Date("2023-11-01T21:13:30Z") },
                { name: "Running", minutes: 30, distance: 2, createdAt: new Date("2023-11-01T21:13:30Z") }

            ]

            const expectedReturn = [
                {
                    date: new Date("2023-11-01T21:13:30Z"),
                    total: 52
                },
                {
                    date: new Date("2023-11-01T21:13:30Z"),
                    total: 20
                },
                {
                    date: new Date("2023-11-01T21:13:30Z"),
                    total: 30
                },

            ]

            const result = helper.buildChartArray(testHabitArray, "minutes");

            expect(result).toStrictEqual(expectedReturn)
        })
    })
})
