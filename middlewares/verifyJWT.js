const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json("invalid token"); //invalid token
            req.email = decoded.UserInfo.email;
            req.is_admin = decoded.UserInfo.is_admin;
            req.user_id = decoded.UserInfo.id;
            next();
        }
    );
}

module.exports = verifyJWT