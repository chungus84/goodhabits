
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import EventModel from './utils/event.model';
import EventForm from './utils/EventForm';


const AddEvent = (eventData) => {

    const habits = eventData.data.habits;
    const submitAction = eventData.submitAction;

    const { id } = useParams()

    const matchHabits = habits.find(ele => {
        if (ele._id === id) return ele
    })

    const [event, setEvent] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [habitId, setHabitId] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setHabitId(id)
    }, [submitted, navigate])

    const submitEvent = (name, minutes, distance, date = new Date().toISOString().split('T')[0], habId = habitId) => {
        const eventToSubmit = new EventModel(name, minutes, distance, date, habId)
        submitAction(eventToSubmit);
        setSubmitted(true)
        navigate(`/habit/${id}`, { replace: true })

    }

    return (
        <>
            <h1>AddEvent</h1>
            <div onClick={() => navigate("/")}>Back to Home</div>
            <EventForm submitAction={submitEvent} data={matchHabits} />
        </>
    )
}

export default AddEvent
