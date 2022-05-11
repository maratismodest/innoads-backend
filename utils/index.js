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
    {value: 5, label: "Недвижимость"},
];

module.exports = {
    convertLinksToMedia, options
}