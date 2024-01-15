import PropTypes from 'prop-types';

import HabitFeed from './Components/HabitFeed';
import HabitCollapsible from './Components/utils/HabitCollapsible';

const HabitPage = ({ data, submitAction }) => {

    const { userId, habitCards, error } = data;

    return (
        <>
            <h2>Habit Page</h2>
            <HabitCollapsible data={{ userId, error }} submitAction={submitAction} />
            <HabitFeed data={{ habitCards, error }} />
        </>
    )
}

HabitPage.propTypes = {
    data: PropTypes.shape({
        userId: PropTypes.string,
        error: PropTypes.string,
        habitCards: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                _id: PropTypes.string,
                type: PropTypes.string
            })
        )
    }),
    submitAction: PropTypes.func.isRequired
}

export default HabitPage
