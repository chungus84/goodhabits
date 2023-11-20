import { render, screen } from '@testing-library/react';
import { MemoryRouter, createMemoryRouter } from 'react-router-dom';


import HabitPage from "../src/HabitPage";
import AddHabit from '../src/Components/AddHabit';


describe('HabitPage tests', () => {




    test('should render HabitPage ', () => {


        const habits = [
            { name: "Running", minutes: 20, distance: 2 },
            { name: "Running", minutes: 30, distance: 3 },

        ]
        const habitCards = [
            { name: "Running", _id: 123 }
        ]
        const error = ''
        render(<MemoryRouter><HabitPage data={{ habits, habitCards, error }} /></MemoryRouter>)

        expect(screen.getByText(/Habit Page/i)).toBeInTheDocument();
    }





    )






})
