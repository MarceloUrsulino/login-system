const request = require('supertest')
const app = require('../app')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const bcrypt = require('bcrypt')


//supertest


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

describe('POST /user/register', () => {
    test('Retorna 422 quando o nome não é enviado.', async () =>{
        const response = await supertest(app)
        .post('/user/register').send({
            name: '', email: 'admin@gmail.com', password: 'aaaaaaa55', confirmpassword: 'aaaaaaa55'
        })
        expect(response.status).toBe(422)
        expect(response.body).toEqual({message: 'O nome é obrigatório.'})
        
    })

    test('Retorna 201 quando o usuário é criado.', async () => {
        User.findOne.mockResolvedValue(null)
        User.create.mockResolvedValue(null)

        bcrypt.genSalt.mockResolvedValue('Salt-falso')
        bcrypt.hash.mockResolvedValue('hash-falso')
        
        const response = await supertest(app)
        .post('/user/register').send({
            name: 'Admin', email: 'admin@gmail.com', password: 'aaaaaaa55', confirmpassword: 'aaaaaaa55'
        })
        expect(response.status).toBe(201)
        expect(response.body).toEqual({message: 'Usuário criado com sucesso.'})
        expect(User.create).toHaveBeenCalledWith({name: 'Admin', email: 'admin@gmail.com', password: 'hash-falso' })
    })
})

