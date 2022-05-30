const upload = require("../middleware/fileserver");
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
                // console.log(filedata)
                const path = req.file.path
                const name = req.file.filename
                res.json({message: "Success!", link: `https://chamala.tatar/uploads/${name}`});
            }
        });
    }
}
module.exports = new UploadController();
