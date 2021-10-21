const {User} = require("../models/models");
const {DataTypes} = require("sequelize");

class UserController {
    async getAll(req, res) {
        const users = await User.findAll()
        const hasParameters = Object.keys(req.query).length
        if (!hasParameters) {

            return res.json(users)
        }
        const {email, userId} = req.query
        if (email) {
            const user = await User.findOne({
                where: {
                    email
                }
            })
            return res.json(user)
        }

        if (userId) {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })
            return res.json(user)
        }
        return res.json(users)

    }

    async postUser(req, res) {
        try {
            let {email, password, name, surname} = req.body
            const user = await User.create({email, password, name, surname});
            return res.json(user)
        } catch (e) {
            return res.json(e)
        }


        // id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        // email: {type: DataTypes.STRING, unique: true},
        // password: {type: DataTypes.STRING},
        // name: {type: DataTypes.STRING},
        // surname: {type: DataTypes.STRING},
        // telegram: {type: DataTypes.STRING, unique: true},
        // phone: {type: DataTypes.STRING, unique: true},
        // role: {type: DataTypes.STRING, defaultValue: "USER"},


        // const user = await User.create({
        //     email: "email",
        //     password: "email",
        //     name: "Inno",
        //     surname: "Ads",
        //     telegram: "",
        //     phone: "+71234567890"
        // })

    }

    // async getUser(req, res) {
    //     const {email} = req.query
    //     const user = await User.findOne(
    //         {
    //             where: {email},
    //         },
    //     )
    //     return res.json(user)
    // }
}

module.exports = new UserController()
