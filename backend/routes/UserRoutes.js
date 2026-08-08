const router = require('express').Router()
const UserController = require('../controllers/UserController')

const checkToken = require('../middleware/checkToken')

router.post('/register', Usercontroller.register)
router.post('/login', Usercontroller.login)
router.post('/resetpassword', checkToken, Usercontroller.resetPassword)




module.exports = router