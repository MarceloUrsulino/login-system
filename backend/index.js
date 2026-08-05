require('dotenv').config()
const express = require('express')

const db = require('./db/conn')
const User = require('./models/User')


const app = express()

app.use(express.json())



// db.sync() confere/cria as tabelas no banco baseado nos models
// é assíncrono (leva um tempo pra conectar no MySQL), por isso retorna uma Promise
db.
sync()
.then(() =>{
    // só libera o servidor DEPOIS que o banco já está garantido
    // assim evita requisições chegando antes do banco estar pronto
    app.listen(3000)
}).catch(err =>{
     // se o sync() falhar (banco fora do ar, senha errada no .env, etc)
    // cai aqui e mostra o erro no console — o app.listen() NÃO roda
    console.log(err)
})

app.listen(3001)