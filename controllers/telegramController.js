const { Tg, Post } = require("../models/models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { categories, convertLinksToMedia } = require("../utils");
const aSequelize = require("../db");

class TelegramController {
    async postTelegram(req, res) {
        try {
            // const chat_id = "@innoadsstage"
            const chat_id = "@innoads";
            const form = req.body;
            const { title, body, price, slug, telegram, categoryId } = form;
            const category = categories.find(
                (item) => item.value == categoryId
            ).label;
            const images = form.images.split("||");

            //message
            const text = `<b>${encodeURI(category)}: ${encodeURI(
                title
            )}</b> %0A %0A${encodeURI(body)} %0A${encodeURI(
                "Цена"
            )}: ${price} %0A${encodeURI(
                "Подробнее"
            )}: https://innoads.ru/post/${slug} %0A %0A${encodeURI(
                "автор"
            )}: @${telegram}`;
            const sendMessage = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=html`;
            await axios.get(sendMessage);

            //media
            const sendPhoto = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMediaGroup?chat_id=${chat_id}`;
            const media = convertLinksToMedia(images);
            await axios.post(sendPhoto, { media });

            return res.json({ status: "success" });
        } catch (e) {
            console.log(e);
            return res.json(null);
        }
    }

    async postSite(req, res) {
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

    async postUser(req, res) {
        let { auth_date, first_name, hash, id, last_name, photo_url, username } =
            req.body;
        const [user, created] = await Tg.findOrCreate({
            where: { id },
            defaults: {
                ...req.body,
            },
        });
        if (created) {
            const token = jwt.sign(
                { id: created.id, username: created.username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 60 * 60 * 24 * 365,
                }
            );

            return res.json(token);
        }
        await Tg.update(
            { auth_date, first_name, hash, last_name, photo_url, username },
            { where: { id: user.id } }
        );

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.TOKEN_KEY,
            {
                expiresIn: 60 * 60 * 24 * 365,
            }
        );

        return res.json({
            token,
        });
    }

}

module.exports = new TelegramController();
