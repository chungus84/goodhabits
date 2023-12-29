import axios from 'axios';

export const loginUser = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_AUTHURL}/login`, user);
        console.log(res);
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
