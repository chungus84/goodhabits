import axios from 'axios';

import { authHeader } from './authHeaders.js';
import { refreshToken } from './refreshToken.js';

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
        const res = await axios.post(`${import.meta.env.VITE_MYDAYSURL}/`, habit, { headers: authHeader() })
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
        const res = await axios.post(`${import.meta.env.VITE_MYDAYSURL}/habits/${event.habitId}/add`, event, { headers: authHeader() })
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
        const res = await axios.get(`${import.meta.env.VITE_MYDAYSURL}/profile/${id}`, { headers: authHeader() })
        return { user: res.data, status: res.status }
    } catch (err) {
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
    try {
        const res = await axios.post(`${import.meta.env.VITE_MYDAYSURL}/profile`, user);
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
