import axios from 'axios';

export const getHabits = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_MYDAYSURL);
        // console.log(res);
        if (Array.isArray(res.data) && res.data?.length > 0) return { habits: res.data, status: res.status };
        throw new Error('There are not habits to retrieve, please add one');
    } catch (err) {
        return {
            habits: [],
            status: err.response?.status ?? 204,
            error: {
                type: 'get',
                message: `Data not available from  the server: ${err.message ?? err.response.message}`
            }
        }
    }
}

export const getHabitEvents = async _id => {
    try {
        // console.log(_id);
        const res = await axios.get(`${import.meta.env.VITE_MYDAYSURL}/habits/${_id.id}`, _id.id)
        // console.log(res.data.length);
        if (Array.isArray(res.data.events) && res.data.events.length > 0) return { events: res.data.events, status: res.status }
        throw new Error("There are no events for this habit, please add one");
    } catch (err) {
        return {
            events: [],
            status: err.response?.status ?? 204,
            error: {
                type: 'get',
                message: `Data not available from the server: ${err.message ?? error.response.message}`
            }
        }
    }
}

export const submitHabit = async habit => {
    try {
        console.log(habit);
        const res = await axios.post(`${import.meta.env.VITE_MYDAYSURL}/`, habit)
        return { habit: res.data, status: res.status };
    } catch (err) {
        return {
            status: err.response?.status,
            error: {
                type: `post`,
                message: err.response?.message
            }
        }
    }
}
