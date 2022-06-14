const jwt = require("jsonwebtoken");
const { Post } = require("../models/models");

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
    if (req.body.telegram !== req.user.username) {
        return res.status(403).send("You are not authorized!")
    }
    next()

};

const isUsersPost = (req, res, next) => {
    const post = await Post.findOne({
        where: { id: req.params.id },
    });

    if (!post) {
        return res.status(400).send("No Post with such ID")
    }

    if (post.tgId != req.user.id) {
        return res.status(403).send("You are not allowed to delete not your post!")
    }
    next()

};

module.exports = { bearerMiddleware, sameUserMiddleware, isUsersPost }