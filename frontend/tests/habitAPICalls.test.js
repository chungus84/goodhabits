import axiosMock from 'axios';
import * as api from '../asyncFunctions/habitAPICalls.js';
import { beforeEach, describe, expect } from 'vitest';

vi.mock('axios');

describe('habitAPICall Suite', () => {
    const testError = { message: 'TestError' };
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

    })
});
