import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // console.log(req);
    const authHeader = req.headers['accesstoken']
    // console.log(authHeader);
    const token = authHeader && authHeader

    // console.log(token);

    if (token == null) return res.status(401)

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        // console.log(err);
        if (err) return res.status(403)
        console.log(user);
        req.user = user
        next()
    })
}
