import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import AddHabit from '../src/Components/AddHabit';

describe('AddHabit tests', () => {

    const mockSubmit = vi.fn().mockImplementation(habit => habit);
    let router;

    afterEach(() => {
        router = undefined;
        vi.clearAllMocks();
    })

    describe('Testing Add Habit rendering and functionality', () => {

        beforeEach(() => {
            const routes = [
                {
                    path: "/add",
                    element: <AddHabit submitAction={mockSubmit} />
                },
                {
                    path: "/",
                    element: <p>Redirected</p>
                }
            ];
            router = createMemoryRouter(routes, {
                initialEntries: ['/add'],
                initialIndex: 0
            });
        });

        test('should render AddHabit page with an h1 showing Add Habit', () => {
            render(<RouterProvider router={router} />)

            const addHabitHeading = screen.getByText(/add habit/i);
            expect(addHabitHeading).toBeInTheDocument();

        });

        test('should render a Habit Form', () => {
            render(<RouterProvider router={router} />)

            const form = screen.getByRole('form');
            expect(form).toBeTruthy();
        });

        test('should call mockSubmit when the form is submitted', async () => {
            render(<RouterProvider router={router} />);
            const habName = "Habit Name";
            const habMinutes = 52;
            const habDistance = 3;
            const habDate = '07/11/2023';
            const submittedHabit = {
                _id: null,
                name: habName,
                minutes: 52,
                distance: 3,
                createdAt: `07/11/2023`
            }
            const nameInput = screen.getByPlaceholderText(/habit name/i);
            const minutesInput = screen.getByTestId('minutes');
            const distanceInput = screen.getByTestId('distance');
            const dateInput = screen.getByTestId('date');

            console.log(dateInput);




            await userEvent.clear(nameInput);
            await userEvent.type(nameInput, habName)

            await userEvent.clear(minutesInput);
            await userEvent.type(minutesInput, habMinutes.toString())

            await userEvent.clear(distanceInput);
            await userEvent.type(distanceInput, habDistance.toString())

            // await userEvent.clear(dateInput);
            await fireEvent.mouseDown(dateInput)
            await fireEvent.change(dateInput, { target: { value: habDate } })

            const submitBtn = screen.getByRole('button');


            await userEvent.click(submitBtn);

            // expect(mockSubmit).toHaveBeenCalledTimes(1);
            // expect(mockSubmit).toHaveBeenCalledWith(submittedHabit);

        })




    })



})
