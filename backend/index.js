require('dotenv').config()

const app = require('./app')


const db = require('./db/conn')
const User = require('./models/User')



db.
sync()
.then(() =>{
    
    console.log('Conectou com o banco.')
    app.listen(3001)
}).catch(err =>{
    
    console.log(err)
})

