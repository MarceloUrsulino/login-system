// DESCRIBE
//IT or TEST
//EXPECT

/** //PRIMEIRO TESTE ABAIXO
 
function sum(a,b){
    return a + b
}

describe('Initial tests', () => {
    test('First unit tests', ()=> {
        const primeiroArgumento = 7
        const segundoArgumento = 1

        let result = sum(primeiroArgumento, segundoArgumento)

        expect(result).toEqual(8)
    })
})
*/
//TESTANDO O ARQUIVO validatePassword FUNÇÃO SENHA 6 DÍGITOS 
/** 
const validatePassword = require('../helpers/validate-password')

describe('Validate-password', () => {
    test('retorna inválido quando a senha tem menos de 6 caracteres ', () => {
        const password = 'a1'

        let result = validatePassword(password)
        expect(result).toEqual({ valid: false, message: 'A senha precisa ter pelo menos 6 caracteres'})
    })
})
    */

describe('Register', () =>  {
    test('Os campos são obrigatórios', () => {
        const req = {
            body: {
                name:'',
                email: 'testando@gmail.com',
                password: '1234bc',
                confirmpassword: '1234bc'

            } 
        }
    })
})