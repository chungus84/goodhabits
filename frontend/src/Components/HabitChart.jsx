import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import { parseISO, format, eachDayOfInterval, endOfWeek, isSameWeek, startOfWeek } from 'date-fns';
import useMeasure from 'react-use-measure';
import { motion } from 'framer-motion';
import "./utils/css/Chart.css"


const HabitChart = ({ data, width, height }) => {

    const dates = []
    const totals = []

    data.forEach(el => dates.push(format(new Date(el.date.slice(0, 10)), 'dd-MMM')))

    data.forEach(el => totals.push(el.total))

    const yExtent = d3.extent(data.map((d) => d.total))
    const yExtentDiff = 0.05 * Math.abs(yExtent[1] - yExtent[0])


    let margin = {
        top: 10,
        right: 20,
        bottom: 35,
        left: 35,
    }

    const gx = useRef();
    const gy = useRef();
    const circleRef = useRef();

    let xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([margin.left + 10, width - margin.right])

    let yScale = d3
        .scaleLinear()
        .domain([yExtent[0] - yExtentDiff, yExtent[1] + yExtentDiff])
        .range([height - margin.bottom, 0])

    let line = d3
        .line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.total));

    let d = line(data);

    useEffect(() => void d3.select(gx.current)
        .call(d3.axisBottom(xScale)
            .ticks(data.length - 1)
            .tickFormat(i => dates[i])),
        [gx, xScale]);

    useEffect(() => void d3.select(gy.current)
        .call(d3.axisLeft(yScale).ticks(5)),
        [gy, yScale]);


    return (
        <>
            <svg viewBox={`0 0 ${width} ${height}`} className='axis'>
                <g ref={gx} transform={`translate(0,${height - margin.bottom})`} strokeDasharray="1,3" />
                <g ref={gy} transform={`translate(${margin.left}, 0)`} strokeDasharray="1,3" />

                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, type: "spring" }} d={d} fill="none" stroke="green" strokeWidth="2" />
                {data.map((d, i) => (
                    <motion.circle key={dates[i]} r="5" cx={xScale(i)} cy={yScale(d.total)} fill="green" strokeWidth="2" />
                ))}

            </svg>
        </>
    )
}

export default HabitChart
