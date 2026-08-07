const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const validatePassword = require('../helpers/validate-password')


module.exports = class Usercontroller{
    static async register(req,res){
        const {name, password, confirmpassword} = req.body
        let email = req.body.email

        if(!name){
            res.status(422).json({message:'O nome é obrigatório.'})
           return
        }
        if(!email){
            res.status(422).json({message:'O e-mail é obrigatório.'})
            return
        }

        //check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!emailRegex.test(email)){
            res.status(422).json({message: 'O e-mail precisa ser válido.'})
            return
        }
        email = email.toLowerCase()

        if(!password){
            res.status(422).json({message:'A senha é obrigatória.'})
            return
        }
        //validation password

        const validationPassword = validatePassword(password) 
        if(!validationPassword.valid){
            res.status(422).json({message: validationPassword.message})
            return
        }
        

        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação é obrigatória.'})
            return
        }

         //validation password

        const validationConfirmpassword = validatePassword(password) 
        if(!validationConfirmpassword.valid){
            res.status(422).json({message: validationConfirmpassword.message})
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
        //hash a password with bcrypt - create a password
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
        //function login
        static async login(req, res){
            const {password} = req.body
            let email = req.body.email

            if(!email){
                res.status(422).json({message:'O e-mail é obrigatório.'})
            return
            }

            email = email.toLowerCase()

            if(!password){
                res.status(422).json({message: 'A senha é obrigatória'})
                return
            }

            //check user in the database
            const userExists = await User.findOne({where: {email: email}})
            if(!userExists){
                res.status(422).json({message: 'Usuário não encontrado.'})
                return
            }
            //check hash with password
            const checkPassword = await bcrypt.compare(password, userExists.password)
            if(!checkPassword){
                res.status(422).json({message: 'A senha está incorreta'})
                return
            }

            //create a token and return to user
            const token = jwt.sign({
                name: userExists.name,
                id: userExists.id
            }, process.env.JWT_SECRET )
            
            res.status(200).json({message: 'Você está conectado', token: token, userId: userExists.id,})

            
        }
         //reset user password
            static async resetPassword(req, res) {
                const {newPassword} = req.body
                const id = req.user.id

                const userExists = await User.findOne({where: {id: id}})

                if(!userExists){
                    res.status(422).json({message: 'Usuário não encontrado'})
                    return
                }

                const validationPassword = validatePassword(newPassword) 
                    if(!validationPassword.valid){
                        res.status(422).json({message: validationPassword.message})
                        return
            }
                //encrypt the new password with bcrypt
                 const salt = await bcrypt.genSalt(12)
                 const passwordHash = await bcrypt.hash(newPassword, salt)

                 //update the user's password in the database
                 await User.update(
                    {password: passwordHash},
                    {where: {id: userExists.id}}
                 )
                 res.status(200).json({message: 'Nova senha atualizada com sucesso'})
            }
        
}