const {Tg} = require("../models/models");
const axios = require("axios")
const {options, convertLinksToMedia} = require("../utils");

class TelegramController {
    async postTelegram(req, res) {
        try {
            // const chat_id = "@innoadsstage"
            const chat_id = "@innoads"
            const form = req.body
            const {title, body, price, slug, telegram, categoryId} = form
            const category = options.find((item)=> item.value == categoryId).label
            const images = form.images.split("||")
            
            //message
            const text = `<b>${encodeURI(category)} : ${title}</b> %0A %0A${encodeURI(body)} %0A${encodeURI('Цена')}:${price} %0A${encodeURI('Подробнее')}: https://innoads.ru/post/${slug} %0A %0A${encodeURI('автор')}: @${telegram}`;
            const sendMessage = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=html`
            await axios.get(sendMessage)

            //media
            const sendPhoto = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMediaGroup?chat_id=${chat_id}`
            const media = convertLinksToMedia(images)
            await axios.post(sendPhoto, {media})
      
            return res.json({status: 'success'});
        } catch (e) {
            console.log(e);
            return res.json(null);
        }
    }

    async postUser(req, res) {
        let {auth_date, first_name, hash, id, last_name, photo_url, username} =
            req.body;
        const [user, created] = await Tg.findOrCreate({
            where: {id: id},
            defaults: {
                ...req.body,
            },
        });
        if (created) {
            console.log(user.id);
            return res.json(created);
        }
        if (user.id == id) {
            const item = await Tg.update({auth_date, first_name, hash, last_name, photo_url, username}, {where: {id: id}});
            return res.json(item);
        }
        return res.json(user);
    }

    async getUser(req, res) {
        const {id} = req.query;
        const user = await Tg.findOne({
            where: {id},
        });
        return res.json(user);
    }
}

module.exports = new TelegramController();