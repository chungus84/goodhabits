import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: `15s` })
}

export const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_ACCESS_TOKEN)
}
