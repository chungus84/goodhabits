import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    console.log(req);
    const authHeader = req.headers['accesstoken']
    const token = authHeader && authHeader

    if (token == null) return res.status(401)

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403)
        req.user = user
        next()
    })
}
