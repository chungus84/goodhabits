import axiosMock from 'axios';
import * as api from '../asyncFunctions/habitAPICalls.js';
import { beforeEach, describe, expect } from 'vitest';

vi.mock('axios');

describe('habitAPICall Suite', () => {
    const testError = { message: 'Test Error' };
    let funcResult;

    describe('getHabits tests', () => {
        const expectedReturn = { habits: [{ _id: 123, name: "Running", minutes: 50, distance: 4, createdAt: "2019-05-04T16:00:00.000Z" }], status: 200 }
        const resolvedRequestWithData = { data: [{ _id: 123, name: "Running", minutes: 50, distance: 4, createdAt: "2019-05-04T16:00:00.000Z" }], status: 200 };

        beforeEach(async () => {
            axiosMock.get.mockResolvedValueOnce(resolvedRequestWithData);
            funcResult = await api.getHabits();
        });

        test('should get a request via axios', async () => {
            expect(axiosMock.get).toHaveBeenCalledOnce();
            expect(axiosMock.get).toHaveBeenCalledWith(import.meta.env.VITE_MYDAYSURL);

        });

        test('should return sample habit when valid data is returned from the server', () => {
            expect(funcResult).toStrictEqual(expectedReturn);
        });
    });

    describe('Empty array returned', () => {
        test('should return an empty array and an error message saying there are no habits in the DB', async () => {
            const errorRes = {
                habits: [],
                status: 204,
                error: {
                    type: `get`,
                    message: `Data not available from  the server: There are not habits to retrieve, please add one`
                }
            };

            axiosMock.get.mockResolvedValueOnce({ data: [], status: 204 });
            funcResult = await api.getHabits();

            expect(funcResult).toStrictEqual(errorRes);
        })

    });

    describe('Error returned', () => {
        test('should return appropriate error message when error is returned from server', async () => {
            const message = `Data not available from  the server: ${testError.message}`;
            const expectedReturn = {
                habits: [],
                status: 400,
                error: {
                    type: `get`,
                    message
                }
            };

            axiosMock.get.mockRejectedValueOnce({ response: { status: 400, message: `Test Error` } });
            funcResult = await api.getHabits();

            expect(funcResult).toStrictEqual(expectedReturn);
        })
    })

    describe('submitHabit tests', () => {
        const testNewHabit = { name: "Walking", minutes: 20, distance: 2 }

        describe('add a new habit request', () => {
            beforeEach(() => {
                api.submitHabit(testNewHabit);
            });
            test('should have made a post request to axios', () => {
                expect(axiosMock.post).toHaveBeenCalledTimes(1);
            });

            test('should have made a request to the / url with the testNewHabit', () => {
                expect(axiosMock.post).toHaveBeenCalledWith(
                    `${import.meta.env.VITE_MYDAYSURL}/`,
                    testNewHabit
                );
            })
        });
        describe('Successful POST request', () => {
            test('should should return the habit I have just added', async () => {
                const expectedResponse = { data: testNewHabit, status: 201 };
                const expectedReturn = { habit: testNewHabit, status: 201 };

                axiosMock.post.mockResolvedValueOnce(expectedResponse);
                funcResult = await api.submitHabit(testNewHabit);

                expect(funcResult).toStrictEqual(expectedReturn);
            });
        });

        describe('Unsuccessful POST request', () => {

            test('should return an error property in the response', async () => {
                const expectedResponse = { response: { status: 400, message: testError.message } }
                const expectedReturn = { status: 400, error: { type: 'post', message: testError.message } }

                axiosMock.post.mockRejectedValueOnce(expectedResponse);
                funcResult = await api.submitHabit(testNewHabit);

                expect(funcResult).toStrictEqual(expectedReturn)

            })

        })
    })
});
