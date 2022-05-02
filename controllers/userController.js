const { User, Tg } = require("../models/models");
const { DataTypes } = require("sequelize");

class UserController {
  async getAll(req, res) {
    const users = await User.findAll();
    const hasParameters = Object.keys(req.query).length;
    if (!hasParameters) {
      return res.json(users);
    }
    const { email, userId } = req.query;
    if (email) {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      return res.json(user);
    }

    if (userId) {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      return res.json(user);
    }
    return res.json(users);
  }

  async postUser(req, res) {
    let { auth_date, first_name, hash, id, last_name, photo_url, username } =
      req.body;
    const [user, created] = await Tg.findCreateFind({
      where: { id: id },
      defaults: {
        ...req.body,
      },
    });
    if (created) {
      console.log(user.id);
      return res.json(created);
    }
    if (user.id == id) {
      const item = await Tg.update(...req.body, {where: {id: id}});
      return res.json(item);
    }
    return res.json(user);
  }
}

module.exports = new UserController();

// async postUser(req, res) {
//     try {
//         let {email, password, name, surname} = req.body
//         const user = await User.create({email, password, name, surname});
//         return res.json(user)
//     } catch (e) {
//         return res.json(e)
//     }
//
// }

// async getUser(req, res) {
//     const {email} = req.query
//     const user = await User.findOne(
//         {
//             where: {email},
//         },
//     )
//     return res.json(user)
// }
