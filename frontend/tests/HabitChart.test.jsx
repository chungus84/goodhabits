import HabitChart from "../src/Components/HabitChart";

import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from "react-router-dom";

screen.debug();

describe('Habitchart tests', () => {
    test('should render a chart when supplied an array of objects', async () => {
        const testHabitArray = [
            { total: 52, date: "2023-11-01T21:13:30Z" },
            { total: 20, date: "2023-11-02T21:13:30Z" },
            { total: 30, date: "2023-11-03T21:13:30Z" }

        ]

        render(<MemoryRouter><HabitChart data={testHabitArray} width={400} height={350} /></MemoryRouter>)
        expect(await screen.findByText(/Fri 03/i)).toBeInTheDocument();

    })
})
