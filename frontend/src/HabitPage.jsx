import PropTypes from 'prop-types';

import HabitFeed from './Components/HabitFeed';

const HabitPage = ({ data }) => {

    const { habits, habitCards, error } = data;


    return (
        <>
            <h2>Habit Page</h2>
            <HabitFeed data={{ habits, habitCards, error }} />
        </>

    )
}

HabitPage.propTypes = {
    data: PropTypes.object
}

export default HabitPage
