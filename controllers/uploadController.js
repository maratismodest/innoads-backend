const upload = require("../middleware/fileserver");
const fs = require("fs");
const uploadSingleImage = upload.single('image');


// https://chamala.tatar/uploads/1653941219081-Eternals.2021.WEB-DLRip_от New-Team_by_JNS82.avi_snapshot_00.20.26.221.jpg

const domain = 'https://chamala.tatar/'

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
                // console.log(filedata)
                const path = req.file.path
                const name = req.file.filename
                res.json({message: "Success!", link: `https://chamala.tatar/uploads/${name}`});
            }
        });
    }

    async deleteImage(req, res) {
        const {link} = req.body;
        let text = 'nothing to delete!'
        if (link.startsWith(domain)) {
            try {
                const res = link.substring(domain.length, link.length)
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
