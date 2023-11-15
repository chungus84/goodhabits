import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import HabitFeed from '../src/Components/HabitFeed';


describe('HabitFeed tests', () => {
    test('should display cards with habit names', () => {
        const data = {
            data: {
                habits: [
                    { name: "Running", minutes: 20, distance: 2 },
                    { name: "Running", minutes: 30, distance: 3 },

                ],
                habitCards: [
                    { name: "Running", _id: 123 }
                ],
                error: ''
            }
        }

        render(<MemoryRouter><HabitFeed data={data} /></MemoryRouter>)

        expect(screen.getByTestId("newcard")).toBeInTheDocument();
    });

})
