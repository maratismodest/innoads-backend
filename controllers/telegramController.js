const {Tg} = require("../models/models");
const axios = require("axios")

const media = (images) => {
    return images.map(image => {
        return {
            "type": "photo",
            "media": image
        }
    })
}

class TelegramController {
    async postTelegram(req, res) {
        try {
            const chat_id = "@innoads"
            console.log('HERE', req.body)
            const form = req.body
            const {title, body, price, slug, telegram, category} = form
            const images = form.images.split("||")
            const sendPhoto = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMediaGroup?chat_id=${chat_id}`
            await axios.post(sendPhoto, {media: media(images)})
            const text = `<b>${category} : ${title}</b> %0A %0A${encodeURI(body)} %0A${encodeURI('Цена')}:${price} %0A${encodeURI('Подробнее')}: https://innoads.ru/post/${slug} %0A %0A${encodeURI('автор')}: @${telegram}`;
            const sendMessage = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=html`
            await axios.get(sendMessage)
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

// async postUser(req, res) {
//     try {
//         const user = await Tg.create({
//             ...req.body
//         });
//         return res.json(user)
//     } catch (e) {
//         return res.json(e)
//     }
//
//
// }


            // const form = {
            //     title: 'title',
            //     body: 'body',
            //     price: '300',
            //     slug: 'some-slug',
            //     telegram: 'maratfaizer',
            //     category: 'category',
            //     images: ['https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/benq_ms502_front.jpg?alt=media&token=3eb5309a-3574-440a-ac21-4bd44bcdd775',
            //         'https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/benq_ms502_front.jpg?alt=media&token=3eb5309a-3574-440a-ac21-4bd44bcdd775']
            // }