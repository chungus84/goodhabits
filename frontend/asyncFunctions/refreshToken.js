import axios from "axios";

export const refreshToken = async (headers) => {

    try {

        const tokenRefreshResult = await axios.post(`${import.meta.env.VITE_AUTHURL}/token`, headers);
        if (tokenRefreshResult.data.accessToken) {
            localStorage.setItem(`user`, JSON.stringify(tokenRefreshResult.data))
        }

        const user = JSON.parse(localStorage.getItem(`user`))
        let newHeaders;

        if (user && user.accessToken) {
            newHeaders = {
                "userId": user.userId,
                "userName": user.userName,
                "accessToken": user.accessToken,
                "refreshToken": user.refreshToken
            }

        }
        const res = await axios.get(`${import.meta.env.VITE_MYDAYSURL}/profile`, { headers: newHeaders })
        return res;

    } catch (err) {
        throw err
    }

}
