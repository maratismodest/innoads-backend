const Router = require('express')
const userController = require("../controllers/userController");
const router = new Router()

module.exports = router


router.get('/', userController.getAll)
router.post('/', userController.postUser)
// router.post('/', userController.getUser)
