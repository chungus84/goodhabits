import { generateAccessToken } from "../services/helper.js";
import { tokenRefresh, removeToken } from "../services/token.service.js";
import jwt from 'jsonwebtoken';

export const refreshToken = async (req, res) => {

    try {
        const token = await tokenRefresh(req.body.refreshToken)
        jwt.verify(token.token, process.env.REFRESH_ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(403).json(err);
            const userName = { name: user.name }
            const accessToken = generateAccessToken(userName);

            res.status(201).json({
                userId: req.body.userId,
                userName: req.body.userName,
                accessToken: accessToken,
                refreshToken: req.body.refreshToken
            })
        })
    } catch (err) {
        res.status(400).json(err);
    }
}

export const deleteToken = async (req, res) => {
    try {
        const tokenDeleted = await removeToken(req.headers.refreshtoken);
        res.status(204).json(tokenDeleted)
    } catch (err) {
        res.status(400).json(err);
    }
}
