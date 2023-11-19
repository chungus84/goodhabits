import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import { parseISO, format, eachDayOfInterval, endOfWeek, isSameWeek, startOfWeek } from 'date-fns';
import useMeasure from 'react-use-measure';
import { motion } from 'framer-motion';


const HabitChart = ({ data, width, height }) => {

    console.log(data);



    let margin = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 24,
    }

    const gx = useRef();
    const gy = useRef();

    let startDay = parseISO(data.at(0).date);
    let endDay = parseISO(data.at(-1).date);
    let days = eachDayOfInterval({ start: startDay, end: endDay })

    console.log(endDay);

    let xScale = d3
        .scaleTime()
        .domain([startDay, endDay])
        .range([margin.left, width - margin.right])

    let yScale = d3
        .scaleLinear()
        .domain(d3.extent(data.map((d) => d.total)))
        .range([height - margin.bottom, margin.top])

    console.log(`ticks ${yScale.ticks(7)}`);

    let line = d3
        .line()
        .x((d) => xScale(parseISO(d.date)))
        .y((d) => yScale(d.total));

    let d = line(data);

    // const x = d3.scaleTime([startDay, endDay], [margin.left, width - margin.right]);
    // const y = d3.scaleLinear(d3.extent(data.map((d) => d.total)), [height - margin.bottom, margin.top]);
    // const line = d3.line((d, i) => x(i), y);
    useEffect(() => void d3.select(gx.current).call(d3.axisBottom(xScale)), [gx, xScale]);
    useEffect(() => void d3.select(gy.current).call(d3.axisLeft(yScale)), [gy, yScale]);

    return (
        <>
            <svg width={width} height={height}>


                <g ref={gx} transform={`translate(0,${height - margin.bottom})`} />
                <g ref={gy} transform={`translate(${margin.left}, 0)`} />
                <path d={d} fill="none" stroke="orange" strokeWidth="2" />




            </svg>
        </>

    )
}

export default HabitChart
