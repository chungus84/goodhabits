import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import HabitFeed from './Components/HabitFeed';

const HabitPage = ({ data }) => {

    const navigate = useNavigate();

    const { habits, habitCards, error } = data;


    return (
        <>
            <h2>Habit Page</h2>
            <div onClick={(() => navigate(`/add`))}>Add Habit</div>

            <HabitFeed data={{ habits, habitCards, error }} />
        </>

    )
}

HabitPage.propTypes = {
    data: PropTypes.object
}

export default HabitPage
