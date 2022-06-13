const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const secretMiddleware = require("../middleware/secretMiddleware");

router.get('/', postController.getPosts)
// router.get('/vector', postController.putVectors)
router.get('/:slug', postController.getOne)
router.post('/', secretMiddleware, postController.postPost)
router.put('/', secretMiddleware, postController.putPost)
router.delete('/:id', secretMiddleware, postController.deletePost)
module.exports = router
