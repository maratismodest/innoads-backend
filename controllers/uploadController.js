const upload = require("../middleware/fileserver");
const fs = require("fs");
const uploadSingleImage = upload.single('image');

class UploadController {

    async postImage(req, res) {
        uploadSingleImage(req, res, function (err) {

            if (err) {
                return res.status(400).send({message: err.message})
            }
            let filedata = req.file;

            if (!filedata) {
                res.json({text: "Ошибка при загрузке файла"});
            } else {
                const path = req.file.path
                const name = req.file.filename
                res.json({message: "Success!", link: `https://chamala.tatar/uploads/${name}`});
            }
        });
    }

    async deleteImage(req, res) {
        const {link} = req.body;
        let text = 'nothing to delete!'
        if (link.startsWith(`${process.env.BACKEND}`)) {
            try {
                const res = link.substring(process.env.BACKEND.length, link.length)
                fs.unlinkSync(`${res}`)
                text = 'deleted!'
            } catch (e) {
                return res.json({message: e.message})
            }

        }
        return res.json({message: text})

    }
}

module.exports = new UploadController();
