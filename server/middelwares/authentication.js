const jwt = require('jsonwebtoken');

//========================
//Verificar Token
//========================

let verifyToken = (req,res,next) => {

    let token = req.get('token'); //De esta manera obtenemos los headers de la url

    jwt.verify(token,process.env.SEED ,(err,decoded)=>{ // se valida el toke par 1 toke, 2 semilla, callback => err y el token decodificado

            if(err){
                return res.status(401).json({
                    ok:false,
                    err: {
                        message: 'Token no valido'
                    }
                });
            }

            req.user = decoded.user;
            next();
    });
    
};


module.exports = {
    verifyToken
}