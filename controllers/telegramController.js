const {Tg} = require("../models/models");

class TelegramController {
    async postUser(req, res) {
        try {
            const user = await Tg.create({
                ...req.body
            });
            return res.json(user)
        } catch (e) {
            return res.json(e)
        }


    }

    async getUser(req, res) {
        const {id} = req.query
        const user = await Tg.findOne(
            {
                where: {id},
            },
        )
        return res.json(user)
    }
}

module.exports = new TelegramController()
