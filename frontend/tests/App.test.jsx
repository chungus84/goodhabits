import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import * as api from '../asyncFunctions/habitAPICalls';

import App from '../src/App'

vi.mock('../asyncFunctions/habitAPICalls.js', () => {
    return {
        getHabits: vi.fn()
    }
});

describe('App Tests', () => {

    afterEach(() => vi.resetAllMocks());
    const expectedReturn = ({ habits: [], status: 204, error: { type: `get`, message: `Deliberate Get Error` } });

    test('should render Home Page with Error', async () => {
        api.getHabits.mockImplementation(() => { });
        render(<MemoryRouter><App /></MemoryRouter>);
        expect(await screen.findByText(/goodhabits/i)).toBeInTheDocument();
    })

    // test('should render error when there are no habits returned from the server', async () => {
    //     api.getHabits.mockImplementation(() => expectedReturn);
    //     render(<MemoryRouter><App /></MemoryRouter>);
    //     const getErrorRender = await screen.findAllByText(`There was a problem getting your habits ${expectedReturn.error.message}`);
    //     expect(getErrorRender.length).toBeGreaterThan(0);
    // })
    test('should first Home Page with resolved return', async () => {
        const successfulReturn = ({
            habits: [{ name: "Running", minutes: 30, distance: 2 },
            { name: "Running", minutes: 20, distance: 1 },
            { name: "Running", minutes: 50, distance: 3 }],
            status: 204,
            error: {}
        })
        api.getHabits.mockImplementation(() => successfulReturn);
        render(<MemoryRouter><App /></MemoryRouter>);
        expect(await screen.findByText(/goodhabits/i)).toBeInTheDocument();
    })
})
