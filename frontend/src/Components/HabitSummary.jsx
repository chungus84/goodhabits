import { useParams, useNavigate } from "react-router-dom"
import MetricCard from "./MetricCard";
import useMeasure from "react-use-measure";
import { parseISO } from 'date-fns';
import { ResizeObserver } from '@juggle/resize-observer';


import HabitChart from './HabitChart';
import { calcMetric, buildChartArray } from "./utils/helper.js";
import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';
import { getHabitEvents } from "../../asyncFunctions/habitAPICalls.js";
import EventModal from "./utils/EventModal";

const HabitSummary = (data) => {

    let [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

    const [metricOption, setMetricOption] = useState("minutes")

    const habitId = useParams();
    const navigate = useNavigate();

    const { habits, events, userId } = data.data;
    const { getEventsFunc } = data
    const { submitAction } = data

    const userHabitIds = {
        habitId: habitId.id,
        userId: userId
    }

    const userHabit = habits.find(ele => {
        if (ele._id === habitId.id) {
            return ele
        }
    })


    useEffect(() => {
        getEventsFunc(userHabitIds);

    }, [])

    return (
        <>
            <h2>{userHabit.name}</h2>
            <div onClick={(() => navigate(`/habit`))}>〈 back</div>
            <EventModal submitAction={submitAction} data={{ habits, userId }} />
            <div className="row">
                <div className="col"><MetricCard data={{ name: userHabit.name, total: calcMetric(events, "minutes"), metric: "minutes" }} /></div>
                <div className="col"><MetricCard data={{ name: userHabit.name, total: calcMetric(events, "distance"), metric: "distance" }} /></div>
            </div>
            <div className="dropdown">
                <select name="metric-dropdown" className="btn dropdown-toggle" id="metricDropDown" onChange={e => setMetricOption(e.target.value)}>
                    <option value="minutes" >minutes</option>
                    <option value="distance">distance</option>
                    <option value="mph">mph</option>
                    <option value="minspermile">mins per mile</option>
                </select>
            </div>
            <div style={{ height: "250px" }} className="my-2">
                <div className="relative h-100 bg-light chart-area" ref={ref}>
                    {bounds.width > 0 && (
                        <>
                            < HabitChart data={buildChartArray(events, metricOption)} width={bounds.width} height={bounds.height} />
                        </>

                    )}
                </div>
            </div >
        </>
    )
}

export default HabitSummary
