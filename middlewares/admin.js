function soloAdmin(req,res,next){

    if(req.rol === "Admin"){
        next();
    }
    else{
        res.redirect('/');
    }

}
module.exports = soloAdmin;