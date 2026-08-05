const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = class Usercontroller{
    static async register(req,res){
        const {name, email, password, confirmpassword} = req.body

        if(!name){
            res.status(422).json({message:'O nome é obrigatório.'})
            return
        }
        if(!email){
            res.status(422).json({message:'O e-mail é obrigatório.'})
            return
        }
        if(!password){
            res.status(422).json({message:'A senha é obrigatória.'})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação é obrigatória.'})
            return
        }

    }
}