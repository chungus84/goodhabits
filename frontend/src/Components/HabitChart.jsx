import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import { parseISO, format, eachDayOfInterval, endOfWeek, isSameWeek, startOfWeek } from 'date-fns';
import useMeasure from 'react-use-measure';
import { motion } from 'framer-motion';


const HabitChart = ({ data, width, height }) => {

    // console.log(`habitChart: ${data.at(0).date}`);

    // console.log(data);

    const xAccessor = d => { return new Date(d.date) }

    const dates = []

    data.forEach(el => dates.push(format(new Date(el.date.slice(0, 10)), 'dd-MMM')))

    console.log(dates);

    let margin = {
        top: 10,
        right: 20,
        bottom: 20,
        left: 24,
    }

    const gx = useRef();
    const gy = useRef();



    // console.log(endDay);

    let xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([margin.left, width - margin.right])

    console.log(xScale.ticks());

    let yScale = d3
        .scaleLinear()
        .domain(d3.extent(data.map((d) => d.total)))
        .range([height - margin.bottom, 0])

    // console.log(`ticks ${yScale.ticks(7)}`);

    let line = d3
        .line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d.total));

    let d = line(data);

    // const x = d3.scaleTime([startDay, endDay], [margin.left, width - margin.right]);
    // const y = d3.scaleLinear(d3.extent(data.map((d) => d.total)), [height - margin.bottom, margin.top]);
    // const line = d3.line((d, i) => x(i), y);
    // useEffect(() => void d3.select(gx.current).call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d-%b")).tickValues(data.map((d) => { return new Date(d.date) }))), [gx, xScale]);
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
            <svg width={width} height={height}>

                <g ref={gx} transform={`translate(0,${height - margin.bottom})`} />
                <g ref={gy} transform={`translate(${margin.left}, 0)`} />
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, type: "spring" }} d={d} fill="none" stroke="orange" strokeWidth="2" />


            </svg>
        </>

    )
}

export default HabitChart
