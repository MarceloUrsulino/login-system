const router = require('express').Router()
const Usercontroller = require('../controllers/UserController')

router.get('/register', Usercontroller.register)