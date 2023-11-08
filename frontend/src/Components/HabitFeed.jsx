import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HabitCard from './HabitCard';
import HabitModel from './utils/habit.model';

const HabitFeed = ({ data }) => {

    const habitCardNames = data.habits;
    // console.log(`habit card names: ${habitCardNames}`);

    useEffect(() => {

    }, [data])

    const popHabitNames = () => {
        if (habitCardNames?.length > 0) {
            let displayHabitNames = [];
            displayHabitNames.push(habitCardNames.map(habit => {
                const newHabit = new HabitModel(habit._id, habit.name, habit.minutes, habit.distance, habit.createdAt)
                return <HabitCard data={newHabit} key={habit._id} />
            }))

            console.log(displayHabitNames);

            return displayHabitNames



        }
    }
    return (
        <div>{popHabitNames()}</div>
    )
}

export default HabitFeed
