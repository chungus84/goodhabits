import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';


import './App.css'

import Header from './Components/Header'
import HabitCard from './Components/HabitCard';
import HabitPage from './HabitPage';
import HabitSummary from './Components/HabitSummary';


import { getHabits } from '../asyncFunctions/habitAPICalls.js';


function App() {
    const [habits, setHabits] = useState([]);
    const [error, setError] = useState({ type: ``, message: `` })
    const [habitCards, setHabitCards] = useState([])

    const cardNames = (habitArray) => {
        let count = 0;
        const habitOBJ = []
        const habitSet = new Set();
        habitArray.forEach(habit => {
            habitSet.add(habit.name);
        })
        // console.log(habitSet);
        habitSet.forEach(e => habitOBJ.push({ name: e, _id: count++ }))
        console.log(habitOBJ);
        return habitOBJ
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
        setHabitCards(cardNames(habitCall))
        // console.log(habitCards);

        // console.log(habits);

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
                    <Route path="/habit/:id" element={<HabitSummary data={habits} />} />
                </Routes>
            </div>
        </>
    )
}

export default App
