import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HabitCard from './HabitCard';
import HabitModel from './utils/habit.model';


import './utils/css/HabitFeed.css'

const HabitFeed = ({ data }) => {

    const habitCardNames = data.habitCards;
    const habits = data.habits;
    // console.log(`habit card names: ${habitCardNames}`);
    console.log(data.habits);

    useEffect(() => {

    }, [data])

    const popHabitNames = () => {
        if (habitCardNames?.length > 0) {
            let displayHabitNames = [];
            displayHabitNames.push(habitCardNames.map(habit => {

                return <HabitCard data={habit} habits={habits} key={habit._id} />
            }))

            // console.log(displayHabitNames);

            return displayHabitNames



        }
    }
    return (
        <div className='row row-cols-sm-auto justify-content-around feed py-3 px-2 rounded' data-testid="newcard">

            {popHabitNames()}


        </div>

    )
}

export default HabitFeed
