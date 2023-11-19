import { useParams, useNavigate } from "react-router-dom"
import MetricCard from "./MetricCard";
import useMeasure from "react-use-measure";
import { parseISO } from 'date-fns';
import { ResizeObserver } from '@juggle/resize-observer';


import HabitChart from './HabitChart';
import { calcMetric, buildChartArray } from "./utils/helper.js";
import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

const HabitSummary = (data) => {

    let [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

    const id = useParams();
    const navigate = useNavigate();
    // console.log(data.data);
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

    // console.log(`userHabuit is: ${userHabit.name}`);

    return (
        <>
            <h2>{userHabit.name}</h2>
            <div onClick={(() => navigate(`/`))}>〈 back</div>
            <div className="row">
                <div className="col"><MetricCard data={{ name: userHabit.name, total: calcMetric(habitRec, "minutes"), metric: "minutes" }} /></div>
                <div className="col"><MetricCard data={{ name: userHabit.name, total: calcMetric(habitRec, "distance"), metric: "distance" }} /></div>
                <h3>{`minutes spent ${userHabit.name}: ${calcMetric(habitRec, "minutes")}`}</h3>
                <h3>{`distance ${calcMetric(habitRec, "distance")} miles`}</h3>
            </div>
            <div style={{ height: "200px" }}>
                <div className="relative h-100 bg-light" ref={ref}>
                    {bounds.width > 0 && (

                        < HabitChart data={buildChartArray(habitRec, 'minutes')} width={bounds.width} height={bounds.height} />
                    )}

                </div>

            </div>





        </>

    )
}

export default HabitSummary
