const secretMiddleware = (req, res, next) => {
    let secret = req.headers['secret'];
    if (!secret) {
        return res.status(403).send("A token is required for authentication");
    }
    if (secret !== process.env.SECRET) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = secretMiddleware