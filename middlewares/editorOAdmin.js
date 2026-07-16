function editorOAdmin(req,res,next){

    if(
        req.session.rol === 'Admin' ||
        req.session.rol === 'Editor'
    ){

        next();

    }else{

        res.send('Acceso Denegado');

    }

}

module.exports = editorOAdmin;