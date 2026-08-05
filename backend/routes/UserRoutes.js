const router = require('express').Router()
const Usercontroller = require('../controllers/UserController')

router.post('/register', Usercontroller.register)




module.exports = router