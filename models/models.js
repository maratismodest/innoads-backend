const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Tg = sequelize.define("tg", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  photo_url: { type: DataTypes.STRING },
  first_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  auth_date: { type: DataTypes.INTEGER },
  hash: { type: DataTypes.STRING },
});

const Post = sequelize.define("post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  body: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER, defaultValue: 0 },
  preview: { type: DataTypes.STRING, allowNull: false },
  images: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, unique: true },
  telegram: { type: DataTypes.STRING, allowNull: false },
  vector: { type: DataTypes.TSVECTOR }
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
});


Tg.hasMany(Post);
Post.belongsTo(Tg);
Category.hasMany(Post);
Post.belongsTo(Category);

module.exports = {
  Post,
  Category,
  Tg
};