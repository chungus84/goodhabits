import axios from 'axios';

export const loginUser = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_AUTHURL}/login`, user);
        return { user: res.data, status: res.status }

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
    console.log(user);
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
