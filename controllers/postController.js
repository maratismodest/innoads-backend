const {Post, User} = require("../models/models")

class PostController {
    // async create(req, res, next) {
    //     try {
    //         let {name, price, brandId, typeId, info} = req.body
    //         const {img} = req.files
    //         let fileName = uuid.v4() + ".jpg"
    //         img.mv(path.resolve(__dirname, '..', 'static', fileName))
    //         const device = await Device.create({name, price, brandId, typeId, img: fileName});
    //
    //         if (info) {
    //             info = JSON.parse(info)
    //             info.forEach(i =>
    //                 DeviceInfo.create({
    //                     title: i.title,
    //                     description: i.description,
    //                     deviceId: device.id
    //                 })
    //             )
    //         }
    //
    //         return res.json(device)
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    //
    // }

    async getAll(req, res) {
        const posts = await Post.findAll()
        return res.json(posts)
    }

    async deletePost(req, res) {
        const posts = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json(posts)
    }

    async getPosts(req, res) {
        const hasParameters = Object.keys(req.query).length
        if (!hasParameters) {
            const posts = await Post.findAll()
            return res.json(posts)
        }
        const {tgId} = req.query
        const posts = await Post.findAll({
            where: {
                tgId
            }
        })
        return res.json(posts)
    }


    async getUserPosts(req, res) {
        // const {id} = req.query
        //
        // const posts = await Post.findAll({
        //     where: {
        //         userId:id
        //     }
        // })
        return res.json({id: 2})
    }

    async getOne(req, res) {
        const {slug} = req.params
        const post = await Post.findOne(
            {
                where: {slug},
            }
        )
        // const user = await User.findOne({
        //     where: {
        //         id: post.userId
        //     }
        // })
        //
        // const result = {...post,email: user.email }
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
        }
        catch (e){
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
