const { Tg } = require("../models/models");

class TelegramController {
  async postUser(req, res) {
    let { auth_date, first_name, hash, id, last_name, photo_url, username } =
      req.body;
    const [user, created] = await Tg.findOrCreate({
      where: { id: id },
      defaults: {
        ...req.body,
      },
    });
    if (created) {
      console.log(user.id);
      return res.json(created);
    }
    return res.json(user);
  }

  async getUser(req, res) {
    const { id } = req.query;
    const user = await Tg.findOne({
      where: { id },
    });
    return res.json(user);
  }
}

module.exports = new TelegramController();

// async postUser(req, res) {
//     try {
//         const user = await Tg.create({
//             ...req.body
//         });
//         return res.json(user)
//     } catch (e) {
//         return res.json(e)
//     }
//
//
// }
