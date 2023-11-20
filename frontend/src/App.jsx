import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';


import './App.css'

import Header from './Components/Header'
import HabitCard from './Components/HabitCard';
import HabitPage from './HabitPage';
import HabitSummary from './Components/HabitSummary';
import AddHabit from './Components/AddHabit';


import { getHabits, submitHabit } from '../asyncFunctions/habitAPICalls.js';
import * as helper from './Components/utils/helper';


function App() {
    const [habits, setHabits] = useState([]);
    const [error, setError] = useState({ type: ``, message: `` })
    const [habitCards, setHabitCards] = useState([])
    const [createHabitStatus, setCreateHabitStatus] = useState(``);



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

    const submitHabitHandler = async habit => {
        const externalDataCallResult = await submitHabit(habit);
        if (externalDataCallResult?.error) {
            const errorObject = { ...externalDataCallResult.error };
            errorObject.message = `There was a problem adding your habit: ${externalDataCallResult.error.message}`;

            return setError(errorObject);
        }

        setCreateHabitStatus(`Habit added`);
        getHabitHandler();
    }

    useEffect(() => {
        getHabitHandler()

    }, [])

    return (
        <>
            <Header />
            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<HabitPage data={{ habits, habitCards, error: error.message }} />} />
                    <Route path="/habit/:id" element={<HabitSummary data={{ habits, habitCards }} />} />
                    <Route path="/add" element={<AddHabit submitAction={submitHabitHandler} data={habits} />} />
                </Routes>
            </div>
        </>
    )
}

export default App
