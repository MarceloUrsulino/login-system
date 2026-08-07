

const validatePassword = (password) =>{
    const passwordRegex = /\d/
    if(password.length < 6 ) {
       
        return {valid: false, message: 'A senha precisa ter pelo menos 6 caractéres'}
    }

    else if(!passwordRegex.test(password)){
        return {valid: false, message: 'A senha precisa ter no mínimo um número.'}

    }else{
        return {valid: true}
    }
}

module.exports = validatePassword