import { useParams, useNavigate } from "react-router-dom"
import MetricCard from "./MetricCard";


import HabitChart from './HabitChart';
import { calcMetric, buildChartArray } from "./utils/helper.js";

const HabitSummary = (data) => {

    const id = useParams();
    const navigate = useNavigate();
    console.log(data.data);
    const { habits, habitCards } = data.data;
    // console.log(habits);
    // console.log(habitCards);


    const userHabit = habitCards.find(ele => {
        console.log(id.id);
        if (ele._id === parseInt(id.id)) return ele
    })

    // console.log(userHabit);

    const habitRec = habits.filter(ele => {
        if (ele.name === userHabit.name) return ele;
    })

    console.log(`userHabuit is: ${userHabit.name}`);

    return (
        <>
            <h2>{userHabit.name}</h2>
            <div onClick={(() => navigate(`/`))}>〈 back</div>
            <h3>{`minutes spent ${userHabit.name}: ${calcMetric(habitRec, "minutes")}`}</h3>
            <h3>{`distance ${calcMetric(habitRec, "distance")} miles`}</h3>
            <h2>Minutes per Day</h2>
            <div className="bg-white"><HabitChart data={buildChartArray(habitRec, 'minutes')} /></div>
            <h2>Distance per Day</h2>
            <div className="bg-white"><HabitChart data={buildChartArray(habitRec, 'distance')} /></div>

        </>

    )
}

export default HabitSummary
