function soloAdmin(req,res,next){

    if(req.session.rol === 'Admin'){

        next();

    }else{

        res.send('Acceso Denegado');

    }

}

module.exports = soloAdmin;