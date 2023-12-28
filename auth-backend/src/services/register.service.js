import AuthUser from "../model/authUser.model.js";
import bcrypt from 'bcrypt';

export const addUser = async (user) => {

    if (await AuthUser.findOne({ email: user.email })) return Promise.reject(new Error("email already exists in the system"))

    if (!user || !user.firstName || !user.lastName || !user.email || !user.userName || !user.password) return Promise.reject(new Error("Invalid arguments"))

    try {

        const newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
            password: bcrypt.hashSync(user.password, 8)
        }

        const res = await AuthUser.create(newUser);
        return res
    } catch (err) {
        throw err;
    }
}
