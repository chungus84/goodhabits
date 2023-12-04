import { useState } from 'react';
import PropTypes from 'prop-types';

const EventForm = ({ submitAction, userEvent }) => {



    const [eventName, setEventName] = useState("");
    const [eventMinutes, setEventMinutes] = useState(0);
    const [eventDistance, setEventDistance] = useState(0);
    const [eventDate, setEventDate] = useState("");


    const handleSubmit = event => {
        event.preventDefault();
        submitAction(eventName, eventMinutes, eventDistance, eventDate,);
        setEventName('');
        setEventMinutes(0);
        setEventDistance(0);
        setEventDate("");


    }



    return (
        <form aria-label="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="eventMinutes">Minutes:</label>
                <input type="text" name="eventMinutes" placeholder='0' className='form-control' value={eventMinutes} onChange={event => setEventMinutes(event.target.value)} />
            </div>
        </form>
    )
}

export default EventForm
