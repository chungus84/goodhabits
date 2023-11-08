import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'

import Header from './Components/Header'
import HabitCard from './Components/HabitCard';
import HabitPage from './HabitPage';


import { getHabits } from '../asyncFunctions/habitAPICalls.js';


function App() {
    const [habits, setHabits] = useState([]);
    const [error, setError] = useState({ type: ``, message: `` })
    const [habitNames, setHabitNames] = useState([])

    const cardNames = (habitArray) => {
        const habitSet = new Set();
        habitArray.forEach(habit => {
            habitSet.add(habit.name);
        })
        return habitSet
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


        setHabitNames(cardNames(habitCall))
        console.log(habitNames);
        setHabits(habitCall);
        console.log(habits);

    }

    useEffect(() => {
        getHabitHandler()

    }, [])

    return (
        <>
            <Header />
            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<HabitPage data={{ habits, habitNames, error: error.message }} />} />
                </Routes>
            </div>
        </>
    )
}

export default App
