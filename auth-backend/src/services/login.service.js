import mongoose from "mongoose";
import AuthUser from "../model/authUser.model.js";
import bcrypt from 'bcrypt';

export const login = async (user) => {

    if (!user || !user.email || !user.password) return Promise.reject('Invalid arguments')

    try {
        const userDetails = await AuthUser.findOne({ email: user.email });
        if (userDetails && (bcrypt.compareSync(user.password, userDetails.password))) {
            return {
                message: 'login was successful', user: {
                    userName: userDetails.userName,
                    userId: userDetails._id
                }
            }
        } else {
            return {
                message: "Details not found"
            }
        }
    } catch (err) {
        throw err;
    }
}
