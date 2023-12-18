import { useState, useEffect } from 'react'
import "./css/Modal.css"
import AddEvent from '../AddEvent';


const EventModal = ({ submitAction, data }) => {

    // console.log(data);
    const habitCards = data.habits
    const userId = data.userId

    const [modal, setModal] = useState(false)

    const toggleModal = () => { setModal(!modal) }



    return (
        <>
            <button className={modal ? "btn btn-danger" : "btn btn-primary"} onClick={toggleModal}>{modal ? "Close" : "Add an Event"}</button>

            {modal && (
                <div className="event-modal-container">
                    <div className="event-modal">
                        <div className="event-modal-header">

                        </div>
                        <div className="modal-content">
                            <AddEvent submitAction={submitAction} data={{ habits: habitCards, userId: userId }} />
                        </div>
                    </div>
                </div>
            )}


        </>


    )
}

export default EventModal;
