const {Post} = require("../models/models")

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

    // async getOne(req, res) {
    //     const {id} = req.params
    //     const device = await Post.findOne(
    //         {
    //             where: {id},
    //             include: [{model: DeviceInfo, as: 'info'}]
    //         },
    //     )
    //     return res.json(device)
    // }
}

module.exports = new PostController()
