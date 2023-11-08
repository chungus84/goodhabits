import PropTypes from 'prop-types';

import HabitFeed from './Components/HabitFeed';

const HabitPage = ({ data }) => {

    const { habits, habitNames, error } = data;


    return (
        <>
            <h2>Habit Page</h2>
            <HabitFeed data={{ habits, habitNames, error }} />
        </>

    )
}

HabitPage.propTypes = {
    data: PropTypes.object
}

export default HabitPage
