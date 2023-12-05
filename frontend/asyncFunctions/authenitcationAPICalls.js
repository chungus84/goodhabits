import axios from 'axios';

export const loginUser = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_AUTHURL}/login`, user);
        console.log(res);

    } catch (err) {
        console.log(err);
    }
}
