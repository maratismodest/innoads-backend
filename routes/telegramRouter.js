const Router = require('express')
const telegramController = require("../controllers/telegramController");
const router = new Router()

module.exports = router

router.post('/post', telegramController.postTelegram)
router.get('/', telegramController.getUser)
router.post('/', telegramController.postUser)
// router.post('/', userController.getUser)
