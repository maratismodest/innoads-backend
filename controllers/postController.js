const {Post, User} = require("../models/models")

class PostController {
    

    async getPosts(req, res) {
        let page = 0;
        let size = 10;
        let categoryId = 1;
        let tgId = 0;
        const pageAsNumber = parseInt(req.query.page)
        const sizeAsNumber = parseInt(req.query.size)
        const categoryAsNumber = parseInt(req.query.category);
        const tgIdAsNumber = parseInt(req.query.tgId);

        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber
        }
        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            size = sizeAsNumber
        }
        const options = {}
        if (!Number.isNaN(categoryAsNumber) && categoryAsNumber > 0 && categoryAsNumber < 5) {
            categoryId = categoryAsNumber
            options.categoryId = categoryId
        } 

        if (!Number.isNaN(tgIdAsNumber) && tgIdAsNumber > 0) {
            tgId = tgIdAsNumber
            options.tgId = tgId
        }

        const posts = await Post.findAndCountAll({
            offset: page * size, limit: size,
            order: [['createdAt', 'DESC']],
            where: options
        })
        return res.json({
            content: posts.rows,
            totalPages: Math.ceil(posts.count / size)
        })
    }

    // async getPosts(req, res) {
    //     const hasParameters = Object.keys(req.query).length
    //     if (!hasParameters) {
    //         const posts = await Post.findAll()
    //         return res.json(posts)
    //     }
    //     const {tgId} = req.query
    //     const posts = await Post.findAll({
    //         where: {
    //             tgId
    //         }
    //     })
    //     return res.json(posts)
    // }

    async deletePost(req, res) {
        const posts = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json(posts)
    }

    async getOne(req, res) {
        const {slug} = req.params
        const post = await Post.findOne(
            {
                where: {slug},
            }
        )
        return res.json(post)
    }

    async postPost(req, res) {
        try {
            const post = await Post.create(
                {
                    ...req.body
                },
            )
            return res.json(post)
        } catch (e) {
            console.log(e)
            return res.json(null)
        }

    }

    async putPost(req, res) {
        const post = await Post.update(
            {
                ...req.body
            }, {
                where: {
                    id: req.body.id
                }
            }
        )
        return res.json(post)
    }

}

module.exports = new PostController()
