import HabitCard from "../HabitCard";
import { parseISO } from 'date-fns';


export const calcMetric = (array, metric) => {
    let total = 0;
    array.forEach((ele) => { total += ele[metric] });
    return total
}

export const cardNames = (habitArray) => {
    const habitOBJ = []
    habitArray.forEach(e => habitOBJ.push({ name: e.name, _id: e._id, type: e.type }))
    // console.log(habitOBJ);
    return habitOBJ
}

export const buildChartArray = (array, metric) => {

    let retArr = [];
    array.forEach((ele) => { retArr.push({ total: ele[metric], date: ele.date }) })
    return retArr

}

// export const popHabitNames = (habits, habitCardsNames) => {
//     if (habitCardNames?.length > 0) {
//         let displayHabitNames = [];
//         displayHabitNames.push(habitCardNames.map(habit => {

//             return (<HabitCard data={habit} habits={habits} key={habit._id} />)
//         }))

//         // console.log(displayHabitNames);

//         return displayHabitNames

//     }
// }
