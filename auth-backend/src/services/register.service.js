import AuthUser from "../model/authUser.model.js";

export const addUser = async (user) => {

    if (await AuthUser.findOne({ email: user.email })) return Promise.reject(new Error("email already exists in the system"))

    if (!user || !user.firstName || !user.lastName || !user.email || !user.userName || !user.password) return Promise.reject(new Error("Invalid arguments"))

    try {
        const res = await AuthUser.create(user);
        return res
    } catch (err) {
        throw err;
    }
}
