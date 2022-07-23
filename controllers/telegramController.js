const { Tg, Post } = require("../models/models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { categories, convertLinksToMedia } = require("../utils");
const aSequelize = require("../db");

class TelegramController {
    async postTelegram(req, res) {
        try {
            const form = req.body;
            const { title, body, price, slug, telegram, categoryId } = form;
            const category = categories.find(
                (item) => item.value == categoryId
            ).label;
            const images = form.images.split("||");
            const bodyText = body.length > 800 ? body.substring(0,800) + '...' : body

            const text = `Категория: #${category}\nЦена: ${price} \n\n${title} \n\n${bodyText} \n\nПодробнее: https://innoads.ru/post/${slug} \n\nавтор: @${telegram}`;

            const sendPhoto = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMediaGroup?chat_id=${process.env.CHAT_NAME}`;

            const media = convertLinksToMedia(images, text);
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
            // await sendSubscribe(post)
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
