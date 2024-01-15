import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './utils/css/HabitForm.css'

const HabitForm = ({ submitAction, data }) => {


    const habit = data.habit

    const [habitName, setHabitName] = useState("");
    const [habitType, setHabitType] = useState("");
    const [userId, setUserId] = useState("")

    const handleSubmit = event => {
        event.preventDefault();
        submitAction(habit?._id, habitName, habitType, new Date().toISOString().split('T')[0], userId);
        setHabitName('');
        setHabitType('');
        setUserId("");
    }

    useEffect(() => {
        setUserId(data.userId)
    })

    return (

        <div className="user-form">
            <form aria-label="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="habitName">Habit Name:&nbsp;</label>
                    <input type="text" name="habitName" id="habitName" placeholder='Habit Name' className='form-control' value={habitName} onChange={event => setHabitName(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="habitType">Type:&nbsp;</label>
                    <input type="text" name="habitType" id="habitType" placeholder='Type of Habit' data-testid="type" className='form-control' value={habitType} onChange={event => setHabitType(event.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className={`btn ${!habitName || !habitType ? `btn-danger` : `btn-primary`} my-3`} disabled={!habitName || !habitType} />
                </div>
            </form>
        </div>
    )
}
HabitForm.propTypes = {
    data: PropTypes.shape({
        userId: PropTypes.string,
        habit: PropTypes.object
    }),
    submitAction: PropTypes.func.isRequired
}

export default HabitForm
