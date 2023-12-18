import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EventForm = ({ submitAction, data }) => {

    // console.log(data);

    const [eventName, setEventName] = useState("");
    const [eventMinutes, setEventMinutes] = useState(0);
    const [eventDistance, setEventDistance] = useState(0);
    const [eventDate, setEventDate] = useState("");
    const [habitId, setHabitId] = useState("")



    const handleSubmit = event => {
        event.preventDefault();
        submitAction(eventName, eventMinutes, eventDistance, new Date(eventDate).toISOString().split("T")[0], habitId);
        setEventName('');
        setEventMinutes(0);
        setEventDistance(0);
        setEventDate("");


    }
    useEffect(() => {
        setEventName(data.name)
        setHabitId(data._id)

    })
    // console.log(eventName);
    // console.log(habitId);



    return (
        <div className="user-form">
            <form aria-label="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="eventMinutes">Minutes:</label>
                    <input type="text" name="eventMinutes" id="eventMinutes" placeholder='0' className='form-control' value={eventMinutes} onChange={event => setEventMinutes(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDistance">Distance:</label>
                    <input type="text" name="eventDistance" id="eventDistance" placeholder='0' className='form-control' value={eventDistance} onChange={event => setEventDistance(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDate">Date:</label>
                    <input type="date" name="eventDate" id="eventDate" placeholder='0' className='form-control' value={eventDate} onChange={event => setEventDate(event.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className={`btn ${!eventMinutes || !eventDate ? `btn-danger` : `btn-primary`} my-3`} disabled={!eventMinutes || !eventDate} />
                </div>
            </form>

        </div>

    )
}

export default EventForm
