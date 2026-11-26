const express = require('express')
//const UserRoutes = require('./routes/UserRoutes')

const app = express()
app.use(express.json())
app.use('/user', UserRoutes)

module.exports = app