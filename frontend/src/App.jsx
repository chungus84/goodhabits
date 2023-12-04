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
import * as helper from './Components/utils/helper';



function App() {
    const [user, setUser] = useState({})
    const [habits, setHabits] = useState([]);
    const [error, setError] = useState({ type: ``, message: `` })
    const [habitCards, setHabitCards] = useState([])
    const [createHabitStatus, setCreateHabitStatus] = useState(``);
    const [createEventStatus, setCreateEventStatus] = useState(``)
    const [events, setEvents] = useState([]);


    const getUserHandler = async () => {
        const externalDataCallResult = await getUser();
        console.log(externalDataCallResult);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error }
            errorObject.message = `There was a problem in retrieving your data ${externalDataCallResult.error.message}`
            setError(errorObject)
        }
        const userCall = externalDataCallResult?.user ? externalDataCallResult.user : [];
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
        const externalDataCallResult = await submitHabitEvent(event);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem adding your habits event ${externalDataCallResult.error.message}`;
            return setError(errorObject)
        }
        setCreateEventStatus(`Event added`);

    }



    const submitHabitHandler = async habit => {
        const externalDataCallResult = await submitHabit(habit);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem adding your habit: ${externalDataCallResult.error.message}`;

            return setError(errorObject);
        }

        setCreateHabitStatus(`Habit added`);
        getUserHandler();
    }

    const getHabitEventsHandler = async userHabit => {
        console.log('getHabitEventsHandler called');
        const externalDataCallResult = await getHabitEvents(userHabit);
        // console.log(externalDataCallResult);

        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem getting your events: ${externalDataCallResult}`;
            setError(errorObject);
        }

        const habitEventsCall = externalDataCallResult?.events ? externalDataCallResult.events : [];
        const userEvents = habitEventsCall.find(ele => {
            if (ele._id === userHabit.habitId) return ele.events.sort
        })
        // console.log(userEvents.events);
        userEvents.events.sort((a, b) => { return new Date(a.date) - new Date(b.date) })
        // console.log(sortedEvents);
        setEvents(userEvents.events)


    }



    useEffect(() => {
        getUserHandler()
        console.log("UseEffect ran in app.jsx");

    }, [])
    console.log(user.user);
    return (
        <>
            <Header data={user.userName} />
            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<HabitPage data={{ user, habitCards, error: error.message }} />} />
                    <Route path="/habit/:id" element={<HabitSummary data={{ habits: habitCards, events: events, userId: user._id }} getEventsFunc={getHabitEventsHandler} />} />
                    <Route path="habit/:id/add" element={<AddEvent submitAction={submitEventHandler} data={{ habits: habitCards }} />} />
                    <Route path="/add" element={<AddHabit submitAction={submitHabitHandler} data={user} />} />
                </Routes>
            </div>
        </>
    )
}

export default App
