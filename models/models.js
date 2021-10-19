const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
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


User.hasMany(Post)
Post.belongsTo(User)
Category.hasMany(Post)
Post.belongsTo(Category)


module.exports = {
    Post,
    Category,
}
