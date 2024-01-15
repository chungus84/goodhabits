import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import "./css/Modal.css"

import AddHabit from '../AddHabit'

const HabitCollapsible = ({ data, submitAction }) => {

    const [modal, setModal] = useState(false)
    const toggleModal = () => { setModal(!modal) }

    return (
        <>
            <button className={modal ? "btn btn-danger my-3" : "btn btn-primary my-3"} onClick={toggleModal}>{modal ? "Close" : "Add a Habit"}</button>
            {modal && (
                <div className="habit-modal-container">
                    <div className="habit-modal">
                        <div className="habit-modal-header">
                        </div>
                        <div className="modal-content">
                            <AddHabit submitAction={submitAction} data={data.userId} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

HabitCollapsible.propTypes = {
    data: PropTypes.shape({
        userId: PropTypes.string,
        error: PropTypes.string
    }),
    submitAction: PropTypes.func.isRequired
}


export default HabitCollapsible
