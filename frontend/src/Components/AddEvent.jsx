
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import EventModel from './utils/event.model';
import EventForm from './EventForm';


const AddEvent = (eventData) => {

    console.log(eventData);

    const [habits] = eventData.data.habits;
    const submitAction = eventData.submitAction;

    const { id } = useParams()

    console.log(habits);



    const [event, setEvent] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [habitId, setHabitId] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (submitted) navigate(`/habits/${id}`)
    }, [submitted, navigate])

    const submitEvent = (name, minutes, distance, date = new Date().toISOString().split('T')[0], habitId = id) => {
        const eventToSubmit = new EventModel(name, minutes, distance, new Date(date), habitId)
        submitAction(eventToSubmit);
        setSubmitted(true)

    }

    return (
        <>
            <h1>AddEvent</h1>
            <div onClick={() => navigate("/")}>Back to Home</div>
            <EventForm submitAction={submitEvent} />
        </>



    )
}

export default AddEvent
