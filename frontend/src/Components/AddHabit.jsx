import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import HabitModel from './utils/habit.model';
import HabitForm from './utils/HabitForm';



const AddHabit = ({ data, submitAction }) => {
    console.log(data);

    const [habit, setHabit] = useState({});
    const [userId, setUserId] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const navigate = useNavigate();
    const { _id } = useParams();

    useEffect(() => {
        setUserId(data)
        if (submitted) navigate("/habit");
    }, [submitted, navigate]);

    const submitHabit = (_id = null, habitName, type, createdAt = new Date().toISOString().split('T')[0], userId) => {
        const habitToSubmit = new HabitModel(_id, habitName, type, createdAt, userId);
        submitAction(habitToSubmit);
        setSubmitted(true);
    }

    return (
        <>
            <h3>Please add a new habit</h3>
            <HabitForm submitAction={submitHabit} data={{ userId: userId, habit: habit }} />
        </>
    )
}

AddHabit.propTypes = {
    data: PropTypes.string,
    submitAction: PropTypes.func.isRequired
}

export default AddHabit
