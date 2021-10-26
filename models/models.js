const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Tg = sequelize.define('tg', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    photo_url: {type: DataTypes.STRING},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    tgId: {type: DataTypes.INTEGER, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    auth_date: {type: DataTypes.INTEGER},
    hash: {type: DataTypes.STRING},
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    telegram: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    body: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER, defaultValue: 0},
    preview: {type: DataTypes.STRING, allowNull: false},
    images: {type: DataTypes.STRING, allowNull: false},
    slug: {type: DataTypes.STRING, unique: true},
    telegram: {type: DataTypes.STRING},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})


// User.hasMany(Post)
Tg.hasMany(Post)
// Post.belongsTo(User)
Post.belongsTo(Tg)
Category.hasMany(Post)
Post.belongsTo(Category)


module.exports = {
    Post,
    Category,
    User,
    Tg
}
