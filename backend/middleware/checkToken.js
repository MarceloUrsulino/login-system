const jwt = require('jsonwebtoken')

    const checkToken = (req, res, next) =>{
        if(!req.headers.authorization){
            res.status(401).json({message: 'Acesso negado.'})
            return
        }
        const authHeader = req.headers.authorization
        const token = authHeader.split(" ")[1]
         

        try {

        const verified = jwt.verify(token, process.env.JWT_SECRET, {algorithms: ['HS256']})
        req.user = verified
        next()

        } catch (err) {

            return res.status(401).json({ message: 'Token inválido.'})
        }
        
    }

    module.exports = checkToken