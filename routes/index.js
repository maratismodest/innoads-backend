const Router = require('express')
const router = new Router()
const postRouter = require('./postRouter')
// const userRouter = require('./userRouter')
const telegramRouter = require('./telegramRouter')
const uploadRouter = require('./uploadRouter')

// router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/telegram', telegramRouter)
router.use('/upload', uploadRouter)


module.exports = router
