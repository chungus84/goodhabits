import axios from 'axios';
import { authHeader } from './authHeaders.js';

export const loginUser = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_AUTHURL}/login`, user);
        if (res.data.user.accessToken) {
            localStorage.setItem(`user`, JSON.stringify(res.data.user))
            return { user: res.data, status: res.status }
        }

    } catch (err) {
        return {
            status: err.response?.status,
            error: {
                type: 'post',
                message: err.response?.message
            }
        }
    }
}

export const addUser = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_AUTHURL}/register`, user)
        return { user: res.data, status: res.status }
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

export const removeRefreshToken = async () => {
    try {
        const tokenDeleted = await axios.delete(`${import.meta.env.VITE_AUTHURL}/token`, { headers: authHeader() });
        return tokenDeleted;
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
