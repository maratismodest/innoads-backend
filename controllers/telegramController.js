const {Tg} = require("../models/models");
const axios = require("axios")

const convertLinksToMedia = (images) => {
    return images.map(image => {
        return {
            "type": "photo",
            "media": image
        }
    })
}

const options = [
    {value: 1, label: "Продам"},
    {value: 2, label: "Куплю"},
    {value: 3, label: "Услуги"},
    {value: 4, label: "Вакансии"},
];


class TelegramController {
    async postTelegram(req, res) {
        try {
            // const chat_id = "@innoadsstage"
            const chat_id = "@innoads"
            const form = req.body
            const {title, body, price, slug, telegram, categoryId} = form
            const category = options.find((item)=> item.value == categoryId).label
            const images = form.images.split("||")
            

            //media
            const sendPhoto = `https://api.telegram.org/bot${process.env.BOT_TOKEN_PROD}/sendMediaGroup?chat_id=${chat_id}`
            const media = convertLinksToMedia(images)
            console.log("media",media)
            await axios.post(sendPhoto, {media: convertLinksToMedia(images)})


            //message
            const text = `<b>${encodeURI(category)} : ${title}</b> %0A %0A${encodeURI(body)} %0A${encodeURI('Цена')}:${price} %0A${encodeURI('Подробнее')}: https://innoads.ru/post/${slug} %0A %0A${encodeURI('автор')}: @${telegram}`;
            const sendMessage = `https://api.telegram.org/bot${process.env.BOT_TOKEN_PROD}/sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=html`
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