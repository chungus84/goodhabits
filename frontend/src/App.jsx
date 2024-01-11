import React, { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.css'
import './Components/utils/css/Authentication.css'


import Header from './Components/Header';
import Authentication from './Components/Authentication';
import HabitPage from './HabitPage';
import HabitSummary from './Components/HabitSummary';
import AddHabit from './Components/AddHabit';
import AddEvent from './Components/AddEvent';

import *  as authApi from '../asyncFunctions/authenitcationAPICalls';
import * as habitApi from '../asyncFunctions/habitAPICalls';
import * as helper from '../src/Components/utils/helper.js';
import { getCurrentUser } from './Components/utils/helper';



const App = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});
    const [userHabits, setUserHabits] = useState({})
    const [userName, setUserName] = useState("")
    const [error, setError] = useState("")
    const [login, setLogin] = useState(false);
    const [habitCards, setHabitCards] = useState([]);
    const [events, setEvents] = useState([]);
    const [createHabitStatus, setCreateHabitStatus] = useState(``);
    const [createEventStatus, setCreateEventStatus] = useState(``);

    const navigate = useNavigate();



    const loginHandler = async (user) => {
        const externalDataCallResult = await authApi.loginUser(user);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem getting your habits ${externalDataCallResult.error.message}`;
            setError(errorObject);
        }
        const loginCall = externalDataCallResult?.user ? externalDataCallResult.user : []
        setUser(loginCall.user)
        setUserId(loginCall.user.userId)
        setUserName(loginCall.user.userName)
        getUserHabitsHandler(userId)
        navigate('/habit')
    }

    const signUpHandler = async (newUser) => {
        const externalDataCallResult = await authApi.addUser(newUser);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem getting your habits ${externalDataCallResult.error.message}`;
            setError(errorObject);
        }
        const addUserCall = externalDataCallResult?.user ? externalDataCallResult.user : []
        const newUserToAdd = {
            userName: addUserCall.userName,
            userId: addUserCall._id
        }
        const addUserDataCallResult = await habitApi.addNewUser(newUserToAdd)
        if (addUserDataCallResult?.user) {
            const loginDetails = {
                email: newUser.email,
                password: newUser.password
            }
            const res = await loginHandler(loginDetails)
        }
    }

    const logoutHandler = async () => {
        setLoggedIn(false);
        await authApi.removeRefreshToken();
        localStorage.removeItem('user')
        setUser({})
        setUserHabits({})
        setHabitCards([])
        setUserId("")
        setUserName("")
        navigate('/home')
    }

    const getUserHabitsHandler = async id => {
        const externalDataCallResult = await habitApi.getUser(id);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem retrieving your habits: ${externalDataCallResult.error.message}`
            setError(errorObject);
        }
        const habitsCall = externalDataCallResult?.user ? externalDataCallResult.user : {};
        setUserHabits(habitsCall)
        setHabitCards(helper.cardNames(habitsCall.habits))
    }

    const submitHabitHandler = async habit => {
        const externalDataCallResult = await habitApi.submitHabit(habit);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem adding your new habit: ${externalDataCallResult.error.message}`
            return setError(errorObject);
        }
        setCreateHabitStatus('Habit Created');
        getUserHabitsHandler(user.userId)
    }

    const submitEventHandler = async event => {
        const externalDataCallResult = await habitApi.submitHabitEvent(event)
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem in adding your event: ${externalDataCallResult.error.message}`;
            setError(errorObject)
        }
        setCreateEventStatus(`Event added`)
        const userAndHabitIds = {
            habitId: event.habitId,
            userId: user.userId
        }
        getHabitEventsHandler(userAndHabitIds);
    }

    const getHabitEventsHandler = async userHabit => {
        const externalDataCallResult = await habitApi.getHabitEvents(userHabit);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem getting your habits events: ${externalDataCallResult.error.message}`
            setError(errorObject)
        }
        const eventsCall = await externalDataCallResult?.events ? externalDataCallResult.events : [];
        const userEvents = eventsCall.find(ele => {
            if (ele._id === userHabit.habitId) return ele.events
        })
        userEvents.events.sort((a, b) => { return new Date(a.date) - new Date(b.date) });
        setEvents(userEvents.events);
    }

    useEffect(() => {
        if (localStorage.getItem(`user`)) {
            const currentUser = getCurrentUser()
            setUser(currentUser)
            setUserId(currentUser.userId)
            setUserName(currentUser.userName)
            getUserHabitsHandler(currentUser.userId)
            navigate('/habit')
        }
    }, [])

    return (
        <>
            <Header logout={logoutHandler} data={user.userName} />
            <Routes>
                <Route index element={<Authentication loginHandler={loginHandler} signUpFunc={signUpHandler} loginFunc={setLogin} login={login} />} />
                <Route path="/home" element={<Authentication loginHandler={loginHandler} signUpFunc={signUpHandler} loginFunc={setLogin} login={login} />} />
                <Route path="/habit" element={<HabitPage data={{ userHabits, habitCards, error: error.message }} submitAction={submitHabitHandler} />} />
                <Route path="/habit/:id" element={<HabitSummary data={{ habits: habitCards, events: events, userId: user.userId }} getEventsFunc={getHabitEventsHandler} submitAction={submitEventHandler} />} />
                <Route path="/habit/:id/add" element={<AddEvent submitAction={submitEventHandler} data={{ habits: habitCards }} />} />
                <Route path="/habit/add" element={<AddHabit data={{ userHabits: userHabits }} submitAction={submitHabitHandler} />} />
            </Routes>
        </>
    )
}

export default App
