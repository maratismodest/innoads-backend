const Router = require('express')
const uploadController = require("../controllers/uploadController");
const router = new Router()

module.exports = router

router.post('/', uploadController.postImage)

