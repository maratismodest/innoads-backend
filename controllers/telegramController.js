const {Tg} = require("../models/models");

class TelegramController {
    async postUser(req, res) {
        try {
            let {
                auth_date,
                first_name,
                hash,
                id,
                last_name,
                photo_url,
                username
            } = req.body
            const user = await Tg.create({
                auth_date,
                first_name,
                hash,
                tgId: id,
                last_name,
                photo_url,
                username
            });
            return res.json(user)
        } catch (e) {
            return res.json(e)
        }


    }

    async getUser(req, res) {
        const {tgId} = req.query
        const user = await Tg.findOne(
            {
                where: {tgId},
            },
        )
        return res.json(user)
    }
}

module.exports = new TelegramController()
