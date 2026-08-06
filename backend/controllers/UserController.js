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
        
        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação precisam ser iguais, tente novamente.'})
            return
        }
        //check is user exists
        const userExists = await User.findOne({where: {email: email}})
        if(userExists){
            res.status(422).json({message: 'E-mail já cadastrado, por favor utilize outro e-mail.'})
            return
        }
        //encrypt a password with bcrypt - Create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        const user = await User.create({
            name,
            email,
            password: passwordHash
        
        })
        res.status(201).json({message: 'Usuário criado com sucesso.'})
    }

}