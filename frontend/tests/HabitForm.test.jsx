import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitForm from '../src/Components/HabitForm';

describe('HabitForm test suite', () => {
    const mockSubmitAction = vi.fn();

    describe('Habit form render tests - adding a habit', () => {
        const testHabit = {};


        describe('Add habit render tests', () => {
            test('should render a Habit Name input and label', () => {
                render(<HabitForm submitAction={mockSubmitAction} habit={testHabit} />)

                expect(screen.getByPlaceholderText(/habit name/i)).toBeInTheDocument();
            });

            test('should render a minutes input and label', () => {
                render(<HabitForm submitAction={mockSubmitAction} habit={testHabit} />)
                expect(screen.getByTestId('minutes')).toBeInTheDocument()
            })
            test('should render a distance input and label', () => {
                render(<HabitForm submitAction={mockSubmitAction} habit={testHabit} />)
                expect(screen.getByTestId('distance')).toBeInTheDocument()
            })
            test('should render a date input and label', () => {
                render(<HabitForm submitAction={mockSubmitAction} habit={testHabit} />)
                expect(screen.getByTestId('date')).toBeInTheDocument()
            })
            test('should render a submit button', () => {
                test('should render a distance input and label', () => {
                    render(<HabitForm submitAction={mockSubmitAction} habit={testHabit} />)
                    expect(screen.getByText('Submit')).toBeInTheDocument()
                })
            })
        })
        describe('Add habit - manipulation tests', () => {
            test('should render the new value in the input when the habit name is updated', async () => {
                render(<HabitForm submitAction={mockSubmitAction} habit={testHabit} />)
                const testName = 'Test Habit'

                const nameInput = screen.getByPlaceholderText(/habit name/i);

                await userEvent.type(nameInput, testName);

                expect(nameInput).toHaveValue(testName);
            })

            test('should enable the submit button if name, minutes and distance fields are filled in', async () => {
                render(<HabitForm submitAction={mockSubmitAction} habit={testHabit} />)
                const testName = 'Test Habit'
                const testMins = 52;
                const testDis = 3;

                const nameInput = screen.getByPlaceholderText(/habit name/i);
                const minutesInput = screen.getByTestId('minutes');
                const distanceInput = screen.getByTestId('distance');
                const submitBtn = screen.getByDisplayValue(/submit/i)

                expect(submitBtn).toBeDisabled();

                await userEvent.type(nameInput, testName)
                await userEvent.type(minutesInput, testMins.toString());
                await userEvent.type(distanceInput, testDis.toString());

                expect(submitBtn).not.toBeDisabled();
            })
        })

    });
})
