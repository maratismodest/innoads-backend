const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')

router.get('/', postController.getPosts)
router.get('/vector', postController.putVectors)
router.get('/:slug', postController.getOne)
router.post('/', postController.postPost)
router.put('/', postController.putPost)
router.delete('/:id', postController.deletePost)
module.exports = router
