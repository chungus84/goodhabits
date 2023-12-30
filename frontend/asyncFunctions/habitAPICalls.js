import axios from 'axios';

import { authHeader } from './authHeaders.js';
import { refreshToken } from './refreshToken.js';

// export const getHabits = async () => {
//     try {
//         const res = await axios.get(import.meta.env.VITE_MYDAYSURL);
//         // console.log(res);
//         if (Array.isArray(res.data) && res.data?.length > 0) return { habits: res.data, status: res.status };
//         throw new Error('There are not habits to retrieve, please add one');
//     } catch (err) {
//         return {
//             habits: [],
//             status: err.response?.status ?? 204,
//             error: {
//                 type: 'get',
//                 message: `Data not available from  the server: ${err.message ?? err.response.message}`
//             }
//         }
//     }
// }

export const getHabitEvents = async userHabitIds => {
    try {

        const res = await axios.get(`${import.meta.env.VITE_MYDAYSURL}/habits/${userHabitIds.habitId}`, { headers: authHeader() })


        if (Array.isArray(res.data.habits) && res.data.habits.length > 0) return { events: res.data.habits, status: res.status }
        throw new Error("There are no events for this habit, please add one");
    } catch (err) {

        if (err.response.status === 403) {
            await refreshToken(authHeader());
            const res = await axios.get(`${import.meta.env.VITE_MYDAYSURL}/habits/${userHabitIds.habitId}`, { headers: authHeader() })


            if (Array.isArray(res.data.habits) && res.data.habits.length > 0) return { events: res.data.habits, status: res.status }


        }
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
        // console.log(habit);
        const res = await axios.post(`${import.meta.env.VITE_MYDAYSURL}/`, habit, { headers: authHeader() })
        // console.log(res);
        return { habit: res.data, status: res.status };
    } catch (err) {

        if (err.response.status === 403) {
            await refreshToken(authHeader())
            const res = await axios.post(`${import.meta.env.VITE_MYDAYSURL}/`, habit, { headers: authHeader() })
            return { habit: res.data, status: res.status };
        }
        return {
            status: err.response?.status,
            error: {
                type: `post`,
                message: err.response?.message
            }
        }
    }
}

export const submitHabitEvent = async event => {
    try {
        // console.log(event);
        const res = await axios.post(`${import.meta.env.VITE_MYDAYSURL}/habits/${event.habitId}/add`, event, { headers: authHeader() })
        // console.log(res);
        return { event: res.data, status: res.status };

    } catch (err) {

        if (err.response.status === 403) {
            await refreshToken(authHeader());
            const res = await axios.post(`${import.meta.env.VITE_MYDAYSURL}/habits/${event.habitId}/add`, event, { headers: authHeader() })
            return { event: res.data, status: res.status };

        }

        return {
            status: err.response?.status,
            error: {
                type: 'post',
                message: err.response?.message
            }
        }
    }
}

export const getUser = async (id) => {

    try {
        // console.log(id);
        const res = await axios.get(`${import.meta.env.VITE_MYDAYSURL}/user`, { headers: authHeader() })
        console.log(res);
        return { user: res.data, status: res.status }

    } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
            const refreshRes = await refreshToken(authHeader());
            return { user: refreshRes.data, status: refreshRes.status }

        }
    }
    return {
        status: err.response?.status,
        error: {
            type: 'get',
            message: err.response?.message
        }
    }
}


export const addNewUser = async (user) => {
    // console.log(user);
    try {
        const res = await axios.post(`${import.meta.env.VITE_MYDAYSURL}/user`, user);
        return { user: res.data, status: res.status }
    } catch (err) {
        return {
            status: err.response?.status,
            error: {
                type: `post`,
                message: err.response?.status
            }
        }
    }

}
