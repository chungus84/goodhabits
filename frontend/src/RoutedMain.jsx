import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';


import './App.css'

import Header from './Components/Header'
import HabitCard from './Components/HabitCard';
import HabitPage from './HabitPage';
import HabitSummary from './Components/HabitSummary';
import AddHabit from './Components/AddHabit';
import AddEvent from './Components/AddEvent';


import { submitHabit, getHabitEvents, submitHabitEvent, getUser } from '../asyncFunctions/habitAPICalls.js';
import { loginUser } from '../asyncFunctions/authenitcationAPICalls.js';
import * as helper from './Components/utils/helper';
import Modal from './Components/utils/Modal';
import Authentication from './Components/Authentication';



function RoutedMain(userId) {
    console.log(userId);

    // const [userId, setUserId] = useState("")
    const [user, setUser] = useState({})
    const [habitCards, setHabitCards] = useState([])
    const [events, setEvents] = useState([]);

    const [habits, setHabits] = useState([]);
    const [error, setError] = useState({ type: ``, message: `` })

    const [createHabitStatus, setCreateHabitStatus] = useState(``);
    const [createEventStatus, setCreateEventStatus] = useState(``)










    const getUserHandler = async (id) => {
        // console.log(id);
        const externalDataCallResult = await getUser(id);
        // console.log(externalDataCallResult.user);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error }
            errorObject.message = `There was a problem in retrieving your data ${externalDataCallResult.error.message}`
            setError(errorObject)
        }
        const userCall = externalDataCallResult?.user ? externalDataCallResult.user : {};
        // console.log(userCall.habits);
        setUser(userCall)
        setHabitCards(helper.cardNames(userCall.habits))

    }

    const getHabitHandler = async () => {
        const externalDataCallResult = await getHabits();
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem getting your habits ${externalDataCallResult.error.message}`;
            setError(errorObject);
        }

        const habitCall = externalDataCallResult?.habits ? externalDataCallResult.habits : [];
        // console.log(habitCall);

        setHabits(habitCall);
        setHabitCards(helper.cardNames(habitCall))
        // console.log(habitCards);

        // console.log(habits);

    }
    // console.log(habitCards);

    const submitEventHandler = async event => {
        // console.log(event);
        // console.log('submitEventHandler called');
        const externalDataCallResult = await submitHabitEvent(event);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem adding your habits event ${externalDataCallResult.error.message}`;
            return setError(errorObject)
        }
        setCreateEventStatus(`Event added`);
        const userHabitIds = {
            habitId: event.habitId,
            userId: user.userId
        }
        getHabitEventsHandler(userHabitIds)

    }



    const submitHabitHandler = async habit => {
        // console.log(habit);
        const externalDataCallResult = await submitHabit(habit);
        // console.log(externalDataCallResult);

        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem adding your habit: ${externalDataCallResult.error.message}`;

            return setError(errorObject);
        }

        const habitCall = externalDataCallResult?.userId ? externalDataCallResult.userId : {}
        // console.log(habitCall);
        setCreateHabitStatus(`Habit added`);
        getUserHandler(userId.userId);
    }

    const getHabitEventsHandler = async userHabit => {
        // console.log('getHabitEventsHandler called');
        // console.log(userHabit);
        const externalDataCallResult = await getHabitEvents(userHabit);
        console.log(externalDataCallResult);

        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem getting your events: ${externalDataCallResult}`;
            setError(errorObject);
        }

        const habitEventsCall = externalDataCallResult?.events ? externalDataCallResult.events : [];
        const userEvents = habitEventsCall.find(ele => {
            if (ele._id === userHabit.habitId) return ele.events
        })
        // console.log(userEvents.events);
        userEvents.events.sort((a, b) => { return new Date(a.date) - new Date(b.date) })
        // console.log(sortedEvents);
        setEvents(userEvents.events)


    }




    useEffect(() => {
        getUserHandler(userId.userId)

        // console.log("UseEffect ran in app.jsx");

    }, [])
    // console.log(user.user);
    return (
        <>


            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<HabitPage data={{ user, habitCards, error: error.message }} submitAction={submitHabitHandler} />} />
                    <Route path="/habit/:id" element={<HabitSummary data={{ habits: habitCards, events: events, userId: user.userId }} getEventsFunc={getHabitEventsHandler} submitAction={submitEventHandler} />} />
                    <Route path="habit/:id/add" element={<AddEvent submitAction={submitEventHandler} data={{ habits: habitCards }} />} />
                    <Route path="/add" element={<AddHabit submitAction={submitHabitHandler} data={user} />} />


                </Routes>
            </div>
        </>
    )
}

export default RoutedMain
