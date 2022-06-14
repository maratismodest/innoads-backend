const { Post } = require("../models/models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const aSequelize = require('./../db')
const { categories } = require("../utils");
const { Op } = sequelize;


const errors = {
    noToken: "Нет токена!",
    tokenInvalid: 'Неверный токен!'
}

class PostController {

    async getPosts(req, res) {
        let page = 0;
        let size = 12;
        let categoryId = 1;
        let tgId = 0;
        const pageAsNumber = parseInt(req.query.page);
        const sizeAsNumber = parseInt(req.query.size);
        const categoryAsNumber = parseInt(req.query.category);
        const tgIdAsNumber = parseInt(req.query.tgId);
        const text = req.query.text;

        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }
        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
            size = sizeAsNumber;
        }
        const options = {};
        if (
            !Number.isNaN(categoryAsNumber) &&
            categoryAsNumber > 0 &&
            categoryAsNumber <= categories.length
        ) {
            categoryId = categoryAsNumber;
            options.categoryId = categoryId;
        }

        if (!Number.isNaN(tgIdAsNumber) && tgIdAsNumber > 0) {
            tgId = tgIdAsNumber;
            options.tgId = tgId;
        }

        if (text) {
            options.vector = { [Op.match]: sequelize.fn('to_tsquery', 'russian', text) }
        }

        const posts = await Post.findAndCountAll({
            offset: page * size,
            limit: size,
            order: [["createdAt", "DESC"]],
            where: options
        });
        return res.json({
            content: posts.rows,
            totalPages: Math.ceil(posts.count / size),
        });
    }

    async deletePost(req, res) {
        const posts = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.json(posts);
    }

    async getOne(req, res) {
        const { slug } = req.params;
        const post = await Post.findOne({
            where: { slug },
        });
        return res.json(post);
    }

    async postPost(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: errors.noToken })
        }

        return jwt.verify(token, 'Kazan2022!', async (err, authData) => {
            if (err)
                res.sendStatus(403).message({ message: tokenInvalid });
            else {

                try {
                    const { title, body } = req.body;
                    const post = await Post.create({
                        ...req.body,
                        vector: aSequelize.fn('to_tsvector', 'russian', [title, body].join(' '))
                    });
                    return res.json(post);

                } catch (e) {
                    console.log(e);
                    return res.json(null);
                }
            }
        })

    }

    async putPost(req, res) {
        const { title, body } = req.body;
        const post = await Post.update(
            {
                ...req.body,
                vector: aSequelize.fn('to_tsvector', 'russian', [title, body].join(' '))
            },
            {
                where: {
                    id: req.body.id,
                },
            }
        );
        return res.json(post);
    }
}

module.exports = new PostController();