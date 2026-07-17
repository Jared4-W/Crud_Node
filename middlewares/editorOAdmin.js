function editorOAdmin(req,res,next){

    if(
        req.rol === 'Admin' ||
        req.rol === 'Editor'
    ){

        next();

    }else{

        res.send('Acceso Denegado');

    }

}

module.exports = editorOAdmin;