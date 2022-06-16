const axios = require('axios')
const { Subscribe } = require("../models/models");

const convertLinksToMedia = (images) => {
    return images.map(image => {
        return {
            "type": "photo",
            "media": image
        }
    })
}

const categories = [
    { value: 1, label: "Продам" },
    { value: 2, label: "Куплю" },
    { value: 3, label: "Услуги" },
    { value: 4, label: "Вакансии" },
    { value: 5, label: "Недвижимость" },
    { value: 6, label: "Одежда" },
    { value: 7, label: "Даром" }
];



const sendSubscribe = async (post) => {
    async function processArray(array) {
        for (const item of array) {
            if (post.vector.includes(item.name)) {
                const text = `https://innoads.ru/post/${post.slug}`
                const sendMessage = `https://api.telegram.org/bot${process.env.SUBSCRIBE_TOKEN}/sendMessage?chat_id=${item.tgId}&text=${text}&parse_mode=html`;
                await axios.get(sendMessage);
            }
        }
        console.log('Done!');
    }
    try {
        const subscibes = await Subscribe.findAll()

        console.log('subscibes', subscibes)

        if (subscibes.length === 0) {
            return
        }

        return await processArray(subscibes)
    }
    catch (e) {
        console.log(e)
    }

}

module.exports = {
    convertLinksToMedia, categories, sendSubscribe
}