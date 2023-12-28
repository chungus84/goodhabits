import mongoose from "mongoose";
import AuthUser from "../model/authUser.model.js";
import Token from "../model/token.model.js";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from "./helper.js";

export const login = async (user) => {

    if (!user || !user.email || !user.password) return Promise.reject('Invalid arguments')

    try {
        const userDetails = await AuthUser.findOne({ email: user.email });
        if (userDetails && (bcrypt.compareSync(user.password, userDetails.password))) {
            const userName = { name: userDetails.userName }
            const accessToken = generateAccessToken(userName);
            const refreshToken = generateRefreshToken(userName);

            await Token.create({ token: refreshToken })

            return {
                message: 'login was successful', user: {
                    userName: userDetails.userName,
                    userId: userDetails._id,
                    accessToken: accessToken,
                    refreshToken: refreshToken
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
