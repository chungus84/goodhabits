import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import HabitFeed from './Components/HabitFeed';
import Modal from './Components/utils/Modal';

const HabitPage = ({ data, submitAction }) => {

    // console.log(data);

    const navigate = useNavigate();

    const { user, habitCards, error } = data;




    return (
        <>
            <h2>Habit Page</h2>
            <Modal data={{ user, habitCards, error }} submitAction={submitAction} />

            <HabitFeed data={{ user, habitCards, error }} />
        </>

    )
}

HabitPage.propTypes = {
    data: PropTypes.object
}

export default HabitPage
