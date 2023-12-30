import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    const authHeader = req.headers['accesstoken']

    const token = authHeader && authHeader

    if (token == null) return res.status(401).send({ message: `No token provided` })

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).send({ message: `Unauthorised` })
        req.user = user
        next()
    })
}
