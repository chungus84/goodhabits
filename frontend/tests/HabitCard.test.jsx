import { MemoryRouter } from "react-router-dom";
import HabitCard from "../src/Components/HabitCard";
import { fireEvent, render, screen } from '@testing-library/react';


describe('HabitCard tests', () => {
    test('should show the habit name on the card', () => {

        render(<MemoryRouter><HabitCard data={{ name: "Walking", _id: 123 }} /></MemoryRouter>)

        expect(screen.getByText(/Walking/i)).toBeDefined()
    });
    test('should click through to habit summary page', async () => {

        render(<MemoryRouter><HabitCard data={{ name: "Walking", _id: 123 }} /></MemoryRouter>)
        const title = screen.getByText(/Walking/i);
        fireEvent.click(title);
        expect(await screen.findByText(/Habit/i)).toBeInTheDocument();
    })
})
