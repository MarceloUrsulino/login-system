const router = require('express').Router()
const Usercontroller = require('../controllers/UserController')

router.post('/register', Usercontroller.register)
router.post('/login', Usercontroller.login)




module.exports = router