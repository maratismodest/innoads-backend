const sequelize = require('./db')
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
    body:{type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER, defaultValue: 0},
    user_id: {type: DataTypes.INTEGER},
    preview: {type: DataTypes.STRING},
    images: {type: DataTypes.STRING},
    slug: {type: DataTypes.STRING},
    category: {type: DataTypes.STRING},
    telegram: {type: DataTypes.STRING},
})

// const Post = sequelize.define('stat', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     count: {type: DataTypes.INTEGER, defaultValue: 0},
//     correct:{type: DataTypes.INTEGER, defaultValue: 0},
//     mistake: {type: DataTypes.INTEGER, defaultValue: 0},
//     avatar: {type: DataTypes.STRING, defaultValue: 'https://firebasestorage.googleapis.com/v0/b/chamala-317a8.appspot.com/o/images%2Ftukai.png?alt=media&token=afcb9a03-0823-4b1f-83ba-a93da3ab5d54'}
// })

Post.belongsTo(User)
User.hasMany(Post)

module.exports = {
    User,
    Post
}