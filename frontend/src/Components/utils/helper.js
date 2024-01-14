
export const calcMetric = (array, metric) => {
    let total = 0;
    array.forEach((ele) => { total += ele[metric] });
    return total
}

export const cardNames = (habitArray) => {
    const habitOBJ = []
    habitArray.forEach(e => habitOBJ.push({ name: e.name, _id: e._id, type: e.type }))
    return habitOBJ
}

export const calcMph = (array) => {
    let retArr = [];
    array.forEach((ele) => { retArr.push({ total: (ele.distance / ele.minutes) * 60, date: ele.date }) })
    return retArr;
}

export const minsPerMile = (array) => {
    let retArr = [];
    array.forEach((ele) => { retArr.push({ total: ele.minutes / ele.distance, date: ele.date }) })
    console.log(retArr);
    return retArr;
}

export const buildChartArray = (array, metric) => {
    let retArr = [];
    if (metric === "mph") return calcMph(array);
    if (metric === "minspermile") return minsPerMile(array);
    array.forEach((ele) => { retArr.push({ total: ele[metric], date: ele.date }) })
    return retArr
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}
