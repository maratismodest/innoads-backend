const {Post} = require("../models/models");
const sequelize = require("sequelize");
const aSequelize = require('./../db')
const {Op} = sequelize;
const {upperFirst, lowerFirst} = require("lodash");

class PostController {
    async putVectors(req, res) {
        const posts = await Post.findAll();
        const ids = posts.map(x => x.id)

        const arr = []

        async function processArray(array) {
            for (const item of array) {
                const res = await Post.findByPk(item)
                // console.log('RES',res)
                const aQuery = `select to_tsvector('russian', body) || to_tsvector('russian', title) from posts where id=${item}`
                const some = await aSequelize.query(aQuery);
                const result = some[0][0]['?column?']
                console.log("RES", result)
                // arr.push(result)

                // res.vector = result
                // await res.save();
            }
            console.log('Done!');
        }

        await processArray(ids)

        return res.json(arr);
    }

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
            categoryAsNumber < 6
        ) {
            categoryId = categoryAsNumber;
            options.categoryId = categoryId;
        }

        if (!Number.isNaN(tgIdAsNumber) && tgIdAsNumber > 0) {
            tgId = tgIdAsNumber;
            options.tgId = tgId;
        }

        if (text) {
            options[Op.or] = [
                {
                    title: {
                        [Op.or]: [
                            {[Op.like]: `%${upperFirst(text)}%`},
                            {[Op.like]: `%${lowerFirst(text)}%`},
                        ],
                    }
                },
                {
                    body: {
                        [Op.or]: [
                            {[Op.like]: `%${upperFirst(text)}%`},
                            {[Op.like]: `%${lowerFirst(text)}%`},
                        ],
                    }
                },
                {
                    vector: {[Op.match]: sequelize.fn('to_tsquery', 'russian', text)}
                }
            ]
            // options.vector = {[Op.match]: sequelize.fn('to_tsquery', 'russian', text)}
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
        const {slug} = req.params;
        const post = await Post.findOne({
            where: {slug},
        });
        return res.json(post);
    }

    async postPost(req, res) {
        try {
            const post = await Post.create({
                ...req.body,
            });
            return res.json(post);
        } catch (e) {
            console.log(e);
            return res.json(null);
        }
    }

    async putPost(req, res) {
        const post = await Post.update(
            {
                ...req.body,
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

// const temp = 'передержка'
// const searchWord = `SELECT * FROM posts WHERE vector @@ to_tsquery('russian', '${temp}');`
// const res = await aSequelize.query(searchWord)

// options[Op.or] = [
//     {
//         title: {
//             [Op.or]: [
//                 {[Op.like]: `%${upperFirst(text)}%`},
//                 {[Op.like]: `%${lowerFirst(text)}%`},
//             ],
//         }
//     },
//     {
//         body: {
//             [Op.or]: [
//                 {[Op.like]: `%${upperFirst(text)}%`},
//                 {[Op.like]: `%${lowerFirst(text)}%`},
//             ],
//         }
//     }
// ]