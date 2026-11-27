
const Usercontroller = require('../controllers/UserController')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



jest.mock('jsonwebtoken', () => {
    return {
        sign: jest.fn()
    }
})

jest.mock('bcrypt', () => {
    return {
        genSalt: jest.fn(),
        hash: jest.fn(),
        compare: jest.fn()
    }
})

jest.mock('../models/User.js', () => {   
    return {
        findOne: jest.fn(),
        create: jest.fn(),
        
    }
})

  beforeEach(() => {
        jest.resetAllMocks()
})

//TESTANDO O REGISTER

    describe('Register', () =>  { 

      

        test('Retorna 422 quando o nome não é enviado.', async () => { 
            const req = {
                body: {
                    name:'',
                    email: 'testando@gmail.com',
                    password: '1234bc',
                    confirmpassword: '1234bc'
                } 
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await Usercontroller.register(req,res)

            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({message: 'O nome é obrigatório.'})
        })

        test('Retorna 422 quando o e-mail não é enviado.', async () => {
           const req = {
            body: {
                name: 'JUJU',
                email: '',
                password: 'abc123abc',
                confirmpassword: 'abc123abc'
            }
           }
           const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
           }
           await Usercontroller.register(req,res)
           expect(res.status).toHaveBeenCalledWith(422)
           expect(res.json).toHaveBeenCalledWith({message: 'O e-mail é obrigatório.'})
        })

       test('Retorna 422 quando o e-mail tem formato inválido.', async () => {
            const req = {
             body: {
                name: 'JUJU',
                email: 'dljfjsj7ff.com',
                password: 'abc123abc',
                confirmpassword: 'abc123abc'
             }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            await Usercontroller.register(req,res)

            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({message: 'O e-mail precisa ser válido.'})
       })
        // Banco simulado: findOne devolve um usuário, então o e-mail "já existe"
       test('Retorna 422 quando o e-mail já está cadastrado.', async () => {
          const req = {
             body: {
                name: 'JUJU',
                email: 'testando@gmail.com',
                password: 'abc123abc',
                confirmpassword: 'abc123abc'
             }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            User.findOne.mockResolvedValue({id: 1})

            await Usercontroller.register(req,res)

            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({message: 'E-mail já cadastrado, por favor utilize outro e-mail.'})
            expect(User.findOne).toHaveBeenCalled()
       })

       test( 'Retorna 201 quando o usuário é criado.', async () => {
            const req = {
                body: {
                    name: 'JUJU',
                    email: 'testando@gmail.com',
                    password: 'abc123abc',
                    confirmpassword: 'abc123abc'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            User.create.mockResolvedValue(null)

            bcrypt.genSalt.mockResolvedValue('Salt-falso')
            bcrypt.hash.mockResolvedValue('hash-falso')

            await Usercontroller.register(req,res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({message: 'Usuário criado com sucesso.'})
            expect(User.create).toHaveBeenCalledWith({name:'JUJU', email: 'testando@gmail.com', password:  'hash-falso'})
       })
    })

    describe('Login', () => {
        test('Retorna 422 quando o e-mail não é enviado.', async () => {
            const req = {
                body: {
                    email: '',
                    password: 'abcdef12345'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            await Usercontroller.login(req,res)
            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({message: 'O e-mail é obrigatório.'})
        })

        test('Retorna 422 se a senha não for enviada.', async() => {
            const req = {
                body: {
                    email: 'admin@gmail.com',
                    password: ''
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            await Usercontroller.login(req,res)

            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({message: 'A senha é obrigatória.'})

        })

        test('Retorna 422 quando o usuário não é encontrado.', async () => {
            const req = {
                body: {
                    email: 'admin@gmail.com',
                    password: 'abcdeee1235'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            User.findOne.mockResolvedValue(null)

            await Usercontroller.login(req,res)
            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({message: 'Usuário não encontrado.'})
            expect(User.findOne).toHaveBeenCalled()
        })

        test('Retorna 422 quando a senha estiver incorreta.', async () => {
            const req = {
                body: {
                    email: 'admin@gmail.com',
                    password: 'abcdeee1235'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            User.findOne.mockResolvedValue({password: 'testando'})
            bcrypt.compare.mockResolvedValue(false)

            await Usercontroller.login(req,res)

            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({message: 'A senha está incorreta.'})
            expect(bcrypt.compare).toHaveBeenCalledWith('abcdeee1235', 'testando')
        })

        test('Retorna 200 se o usuário estiver uma conta registrada.', async () => {
            const req = {
                body: {
                    email: 'admin@gmail.com',
                    password: 'admin'
                }
            }
            const res = {
                status : jest.fn().mockReturnThis(),
                json: jest.fn()
            }  
            process.env.JWT_SECRET = 'segredo-teste'
            User.findOne.mockResolvedValue({id: 1, name: 'admin', password: 'admin'}) 
            bcrypt.compare.mockResolvedValue(true)
            jwt.sign.mockReturnValue('falsoTokenExemploTeste')
            await Usercontroller.login(req,res)
            
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({message: 'Você está conectado', token: 'falsoTokenExemploTeste', userId: 1,})
            expect(jwt.sign).toHaveBeenCalledWith({name: 'admin', id: 1,}, process.env.JWT_SECRET, {expiresIn: '4h'})
        })
    })