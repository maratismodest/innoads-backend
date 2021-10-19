const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')

router.get('/', postController.getAll)

module.exports = router