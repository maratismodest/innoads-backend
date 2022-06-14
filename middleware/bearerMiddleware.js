const jwt = require("jsonwebtoken");

const bearerMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ''
    if (!token) {
        return res.status(401).send("Bearer token is required for authentication");
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err)
            return res.status(401).send("Invalid Bearer Token");
        else {
            req.user = decoded
            next()
        }
    })

};

const sameUserMiddleware = (req, res, next) => {
    console.log('req.user.decoded', req.user);
    if (req.body.telegram !== req.user.username) {
        return res.status(403).send("You are not authorized!")
    }
    next()

};

module.exports = { bearerMiddleware, sameUserMiddleware }