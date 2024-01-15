import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HabitCard from './HabitCard';

import './utils/css/HabitFeed.css'

const HabitFeed = ({ data }) => {

    const habitCardNames = data.habitCards;


    useEffect(() => {
    }, [data])

    const popHabitNames = (habitCardsNames) => {
        if (habitCardNames?.length > 0) {
            let displayHabitNames = [];
            displayHabitNames.push(habitCardNames.map(habit => {
                return <HabitCard data={habit} key={habit._id} />
            }))
            return displayHabitNames
        }
    }

    return (
        <div className='row row-cols-sm-auto justify-content-around feed py-3 px-2 mt-3 rounded' data-testid="newcard">
            {popHabitNames(habitCardNames)}
        </div>
    )
}

export default HabitFeed
