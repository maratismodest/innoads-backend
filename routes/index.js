const Router = require('express')
const router = new Router()
const postRouter = require('./postRouter')
const userRouter = require('./userRouter')
const telegramRouter = require('./telegramRouter')

router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/telegram', telegramRouter)


module.exports = router
