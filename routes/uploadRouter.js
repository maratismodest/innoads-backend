const Router = require('express')
const uploadController = require("../controllers/uploadController");
const secretMiddleware = require("../middleware/secretMiddleware");
const router = new Router()

router.post('/', secretMiddleware, uploadController.postImage)
router.delete('/', secretMiddleware, uploadController.deleteImage)

module.exports = router
