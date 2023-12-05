import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const HabitForm = ({ submitAction, data }) => {

    // console.log(data);

    const habit = data.habit

    const [habitName, setHabitName] = useState("");
    const [habitType, setHabitType] = useState("");
    const [userId, setUserId] = useState("")
    // const [habitDistance, setHabitDistance] = useState(0);
    // const [habitCreatedAt, setHabitCreatedAt] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        submitAction(habit?._id, habitName, habitType, new Date().toISOString().split('T')[0], userId);
        setHabitName('');
        setHabitType('');
        setUserId("");

        // setHabitDistance(0);
        // setHabitCreatedAt("");
    }

    useEffect(() => {
        setUserId(data.userId)
    })

    return (
        <form aria-label="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="habitName">Habit Name:&nbsp;</label>
                <input type="text" name="habitName" placeholder='Habit Name' className='form-control' value={habitName} onChange={event => setHabitName(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="habitType">Type:&nbsp;</label>
                <input type="text" name="habitType" placeholder='Type of Habit' data-testid="type" className='form-control' value={habitType} onChange={event => setHabitType(event.target.value)} />
            </div>
            {/* <div className="form-group">
                <label htmlFor="habitDistance">Distance:&nbsp;</label>
                <input type="number" name="habitDistance" placeholder='0' data-testid="distance" className='form-control' value={habitDistance} onChange={event => setHabitDistance(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="habitCreatedAt">Date:&nbsp;</label>
                <input type="date" name="habitCreatedAt" placeholder='' data-testid="date" className='form-control' value={habitCreatedAt} onChange={event => setHabitCreatedAt(event.target.value)} />
            </div> */}
            <div className="form-group">
                <input type="submit" value="Submit" className={`btn ${!habitName || !habitType ? `btn-danger` : `btn-primary`}`} disabled={!habitName || !habitType} />
            </div>

        </form>
    )
}

export default HabitForm
