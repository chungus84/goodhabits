import HabitCard from "../HabitCard";
import { parseISO } from 'date-fns';


export const calcMetric = (array, metric) => {
    let total = 0;
    array.forEach((ele) => { total += ele[metric] });
    return total
}

export const cardNames = (habitArray) => {
    let count = 0;
    const habitOBJ = []
    const habitSet = new Set();
    habitArray.forEach(habit => {
        habitSet.add(habit.name);
    })
    // console.log(habitSet);
    habitSet.forEach(e => habitOBJ.push({ name: e, _id: count++ }))
    // console.log(habitOBJ);
    return habitOBJ
}

export const buildChartArray = (array, metric) => {
    let retArr = [];
    array.forEach((ele) => { retArr.push({ total: ele[metric], date: ele.createdAt }) })
    // console.log(retArr);
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
