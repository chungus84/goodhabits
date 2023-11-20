import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import HabitModel from './utils/habit.model';
import HabitForm from './HabitForm';



const AddHabit = ({ submitAction, data }) => {

    const [habit, setHabit] = useState({});
    const [submitted, setSubmitted] = useState(false)

    const navigate = useNavigate();
    const { _id } = useParams();

    useEffect(() => {
        if (submitted) navigate("/");
    }, [submitted, navigate]);

    const submitHabit = (_id = null, habitName, minutes, distance, createdAt = new Date(Date.now())) => {
        const habitToSubmit = new HabitModel(_id, habitName, minutes, distance, new Date(createdAt).toISOString(),);
        submitAction(habitToSubmit);
        setSubmitted(true);
    }

    return (
        <>
            <h1>Add Habit</h1>
            <div onClick={() => navigate("/")}>Back to Home</div>
            <HabitForm submitAction={submitHabit} habit={habit?.error ? {} : habit} />
        </>


    )
}

export default AddHabit
