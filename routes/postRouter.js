const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const { bearerMiddleware, sameUserMiddleware } = require("../middleware/bearerMiddleware");

router.get('/', postController.getPosts)
router.get('/:slug', postController.getOne)
router.post('/', bearerMiddleware, sameUserMiddleware, postController.postPost)
router.put('/', bearerMiddleware, sameUserMiddleware, postController.putPost)
router.delete('/:id', bearerMiddleware, sameUserMiddleware, postController.deletePost)
module.exports = router
