const router = require('express').Router()
const UserController = require('../controllers/UserController')

const checkToken = require('../middleware/checkToken')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/resetpassword', checkToken, UserController.resetPassword)




module.exports = router