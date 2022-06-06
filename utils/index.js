const convertLinksToMedia = (images) => {
    return images.map(image => {
        return {
            "type": "photo",
            "media": image
        }
    })
}

const categories = [
    {value: 1, label: "Продам"},
    {value: 2, label: "Куплю"},
    {value: 3, label: "Услуги"},
    {value: 4, label: "Вакансии"},
    {value: 5, label: "Недвижимость"},
    {value: 6, label: "Одежда"},
    {value: 7, label: "Даром"}
];

module.exports = {
    convertLinksToMedia, categories
}