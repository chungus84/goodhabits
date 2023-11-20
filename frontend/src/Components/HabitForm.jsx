import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const HabitForm = ({ submitAction, habit }) => {

    const [habitName, setHabitName] = useState("");
    const [habitMinutes, setHabitMinutes] = useState(0);
    const [habitDistance, setHabitDistance] = useState(0);
    const [habitCreatedAt, setHabitCreatedAt] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        submitAction(habit?._id, habitName, habitMinutes, habitDistance, habitCreatedAt);
        setHabitName('');
        setHabitMinutes(0);
        setHabitDistance(0);
        setHabitCreatedAt("");
    }

    return (
        <form aria-label="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="habitName">Habit Name:&nbsp;</label>
                <input type="text" name="habitName" placeholder='Habit Name' className='form-control' value={habitName} onChange={event => setHabitName(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="habitMinutes">Minutes:&nbsp;</label>
                <input type="number" name="habitMinutes" placeholder='0' className='form-control' value={habitMinutes} onChange={event => setHabitMinutes(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="habitDistance">Distance:&nbsp;</label>
                <input type="number" name="habitDistance" placeholder='0' className='form-control' value={habitDistance} onChange={event => setHabitDistance(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="habitCreatedAt">Date:&nbsp;</label>
                <input type="date" name="habitCreatedAt" placeholder='' className='form-control' value={habitCreatedAt} onChange={event => setHabitCreatedAt(event.target.value)} />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className={`btn ${!habitName || !habitMinutes || !habitDistance ? `btn-danger` : `btn-primary`}`} disabled={!habitName || !habitMinutes || !habitDistance} />
            </div>

        </form>
    )
}

export default HabitForm
