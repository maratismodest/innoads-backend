const Router = require('express')
const telegramController = require("../controllers/telegramController");
const secretMiddleware = require("../middleware/secretMiddleware");
const router = new Router()

module.exports = router

router.post('/post', telegramController.postTelegram)
router.post('/site', secretMiddleware, telegramController.postSite)
router.post('/', telegramController.postUser)