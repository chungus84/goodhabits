import axios from 'axios';

export const getHabits = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_MYDAYSURL);
        console.log(res);
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
    } s
}
