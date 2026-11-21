require('dotenv').config()
const express = require('express')

const db = require('./db/conn')
const User = require('./models/User')


const app = express()

app.use(express.json())

const UserRoutes = require('./routes/UserRoutes')
app.use('/user', UserRoutes)




db.
sync()
.then(() =>{
    
    console.log('Conectou com o banco.')
    app.listen(3001)
}).catch(err =>{
    
    console.log(err)
})

