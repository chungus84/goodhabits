import PropTypes from 'prop-types';


import HabitFeed from './Components/HabitFeed';
import Modal from './Components/utils/Modal';

const HabitPage = ({ data, submitAction }) => {

    // console.log(data);

    const { userHabits, habitCards, error } = data;
    console.log(userHabits);


    return (
        <>
            <h2>Habit Page</h2>
            <Modal data={{ userHabits, habitCards, error }} submitAction={submitAction} />

            <HabitFeed data={{ userHabits, habitCards, error }} />
        </>

    )
}

HabitPage.propTypes = {
    data: PropTypes.object
}

export default HabitPage
