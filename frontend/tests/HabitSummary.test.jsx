import HabitSummary from "../src/Components/HabitSummary";
import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from "react-router-dom";


describe('HabitSummary tests', () => {
    test('should display name of habit', () => {


        const habitCards = [
            { name: "Running", _id: 123 }
        ]
        const habits = [
            { name: "Running", minutes: 30, distance: 2 },
            { name: "Running", minutes: 20, distance: 1 },
            { name: "Running", minutes: 50, distance: 3 }

        ]

        const error = ''

        const id = "123"

        render(<MemoryRouter initialEntries={[`/habit/${id}`]}>
            <Routes>
                <Route path="/habit/:id" element={<HabitSummary data={{ habits, habitCards, error }} />} />
            </Routes>

        </MemoryRouter>)

        expect(screen.getAllByText(/Running/i)).toBeDefined();

    })
    test('should should click through back to habit page', async () => {
        const habitCards = [
            { name: "Running", _id: 123 }
        ]
        const habits = [
            { name: "Running", minutes: 30, distance: 2 },
            { name: "Running", minutes: 20, distance: 1 },
            { name: "Running", minutes: 50, distance: 3 }

        ]

        const error = ''

        const id = "123"

        render(<MemoryRouter initialEntries={[`/habit/${id}`]}>
            <Routes>
                <Route path="/habit/:id" element={<HabitSummary data={{ habits, habitCards, error }} />} />
            </Routes>

        </MemoryRouter>)

        const title = screen.getByText(/Minutes spent Running/i);
        fireEvent.click(title);
        expect(await screen.findByText(/Minutes per Day/i)).toBeInTheDocument();
        expect(await screen.findByText(/ back/i)).toBeInTheDocument();

    })
})
