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

const HabitSummary = (data) => {

    let [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

    const id = useParams();
    const navigate = useNavigate();
    // console.log(getEventsFunc);
    // console.log(data);
    const { habits, events } = data.data;
    const { getEventsFunc } = data
    // const { getEvents } = data.getEventsFunc

    // console.log(habits);
    // console.log(`events: ${events}`);




    // console.log(habitCards);

    // console.log(events);

    const userHabit = habits.find(ele => {

        if (ele._id === id.id) {

            return ele
        }
    })

    // const getHabitEvents = (_id) => {
    //     getEventsFunc(_id);
    // }

    // console.log(userHabit);
    // console.log(events);

    // const habitRec = habits.filter(ele => {
    //     if (ele.name === userHabit.name) return ele;
    // })

    // console.log(`userHabuit is: ${userHabit.name}`);
    // buildChartArray(events, "minutes");

    useEffect(() => {
        getEventsFunc(id);
    }, [])

    return (
        <>
            <h2>{userHabit.name}</h2>
            <div onClick={(() => navigate(`/`))}>〈 back</div>
            <div className="btn btn-primary rounded-pill" onClick={(() => navigate(`/habit/${userHabit._id}/add`))}>Add Event</div>

            <div className="row">
                <div className="col"><MetricCard data={{ name: userHabit.name, total: calcMetric(events, "minutes"), metric: "minutes" }} /></div>
                <div className="col"><MetricCard data={{ name: userHabit.name, total: calcMetric(events, "distance"), metric: "distance" }} /></div>
                <h3>{`minutes spent ${userHabit.name}: ${calcMetric(events, "minutes")}`}</h3>
                <h3>{`distance ${calcMetric(events, "distance")} miles`}</h3>
            </div>
            <div style={{ height: "200px" }}>
                <div className="relative h-100 bg-light" ref={ref}>
                    {bounds.width > 0 && (

                        < HabitChart data={buildChartArray(events, 'minutes')} width={bounds.width} height={bounds.height} />
                    )}

                </div>

            </div>





        </>

    )
}

export default HabitSummary
