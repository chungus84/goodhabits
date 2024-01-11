import { local } from "d3"

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
        return {
            "userId": user.userId,
            "userName": user.userName,
            "accessToken": user.accessToken,
            "refreshToken": user.refreshToken
        }
    } else {
        return {};
    }
}
