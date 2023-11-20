import { render, screen } from '@testing-library/react';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

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
        })



    })



})
