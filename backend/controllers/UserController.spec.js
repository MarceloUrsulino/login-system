
const Usercontroller = require('../controllers/UserController')

jest.mock('../models/User.js', () => {   //MOCK PARA TESTE DE MÉTODOS EXTERNOS / BANCO findOne e create.
    return {
        findOne: jest.fn(),
        create: jest.fn()
    }
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
    })