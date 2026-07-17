const jwt = require('jsonwebtoken');

function verificarToken(req,res,next){

    const token = req.cookies.token;

    if(!token){

        return res.redirect('/');

    }

    try{

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded.usuario;
        req.rol = decoded.rol;

        res.locals.usuario = req.usuario;
        res.locals.rol = req.rol;

        next();

    }catch(error){

        return res.redirect('/');

    }

}

module.exports = verificarToken;