import { useParams, useNavigate } from "react-router-dom"

import HabitChart from './HabitChart';

const HabitSummary = (data) => {

    const id = useParams();
    const navigate = useNavigate();
    // console.log(data.data);
    const { habits, habitCards } = data.data;
    // console.log(habits);
    // console.log(habitCards);


    const userHabit = habitCards.find(ele => {
        if (ele._id === parseInt(id.id)) return ele
    })

    // console.log(userHabit);

    const habitRec = habits.filter(ele => {
        if (ele.name === userHabit.name) return ele;
    })

    const calcMetric = (metric) => {
        let total = 0;
        habitRec.forEach((ele) => { total += ele[metric] });
        return total
    }

    const buildChartArray = (metric) => {
        let retArr = [];
        habitRec.forEach((ele) => { retArr.push(ele[metric]) })
        // console.log(retArr);
        return retArr

    }


    return (
        <>
            <div>{userHabit.name}</div>
            <div onClick={(() => navigate(`/`))}>back</div>
            <div>{`minutes: ${calcMetric("minutes")}`}</div>
            <div>{`distance ${calcMetric("distance")} miles`}</div>
            <div className="bg-white"><HabitChart data={buildChartArray('minutes')} /></div>
            <div className="bg-white"><HabitChart data={buildChartArray('distance')} /></div>

        </>

    )
}

export default HabitSummary
