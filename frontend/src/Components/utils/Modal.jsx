import { useState, useEffect } from 'react'
import "./css/Modal.css"
import HabitForm from '../HabitForm'
import AddHabit from '../AddHabit'


const Modal = ({ data, submitAction }) => {

    console.log(data);
    // console.log(submitAction);

    const [modal, setModal] = useState(false)

    const toggleModal = () => { setModal(!modal) }



    return (
        <>
            <button className={modal ? "btn btn-danger" : "btn btn-primary"} onClick={toggleModal}>{modal ? "Close" : "Add a Habit"}</button>

            {modal && (
                <div className="habit-modal-container">
                    <div className="habit-modal">
                        <div className="habit-modal-header">

                        </div>
                        <div className="modal-content">
                            <AddHabit submitAction={submitAction} data={data.user} />
                        </div>
                    </div>
                </div>
            )}


        </>


    )
}

export default Modal
