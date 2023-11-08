import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HabitCard from './HabitCard';
import HabitModel from './utils/habit.model';

const HabitFeed = ({ data }) => {

    const habitCardNames = data.habitCards;
    // console.log(`habit card names: ${habitCardNames}`);

    useEffect(() => {

    }, [data])

    const popHabitNames = () => {
        if (habitCardNames?.length > 0) {
            let displayHabitNames = [];
            displayHabitNames.push(habitCardNames.map(habit => {

                return <HabitCard data={habit.name} key={habit._id} />
            }))

            // console.log(displayHabitNames);

            return displayHabitNames



        }
    }
    return (
        <div>{popHabitNames()}</div>
    )
}

export default HabitFeed
