const conexion = require('../database/db');

// metodo login
exports.login=(req,res)=>{

    const usuario=req.body.usuario;

    const password=req.body.password;

    const sql=`

    SELECT *

    FROM Tb_Usuarios U

    INNER JOIN Tb_Roles R

    ON U.Id_Rol=R.Id_Rol

    WHERE U.Usuarios=?

    AND U.Pass=?

    `;

    conexion.query(
        sql,
        [usuario,password],
        (error,resultado)=>{

            if(error){

                console.log(error);

                return;
            }

            if(resultado.length>0){

                req.session.usuario=
                resultado[0].Usuarios;

                req.session.rol=
                resultado[0].Nombre;

                res.redirect('/asignaturas');

            }else{

                res.redirect('/error');

            }

        }
    );

}

// guardar asignatura
exports.saveAsignatura = (req, res)=>{

    const nombresMaterias = req.body.nombresMaterias;
    const horasTotales = req.body.horasTotales;

    conexion.query(
        'INSERT INTO CAsignaturas SET ?',
        {
            nombresMaterias,
            horasTotales
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/asignaturas');
            }

        }
    );

};



// actualizar
exports.updateAsignatura = (req,res)=>{

    const idAsignatura = req.body.idAsignatura;

    const nombresMaterias = req.body.nombresMaterias;

    const horasTotales = req.body.horasTotales;

    conexion.query(
        'UPDATE CAsignaturas SET ? WHERE idAsignatura = ?',
        [
            {
                nombresMaterias,
                horasTotales
            },
            idAsignatura
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/asignaturas');
            }

        }
    );

};


//CHorarios
exports.saveHorario = (req,res)=>{

    const dia = req.body.dia;

    const horaInicio = req.body.horaInicio;

    const horaFin = req.body.horaFin;

    const aula = req.body.aula;

    conexion.query(
        'INSERT INTO CHorarios SET ?',
        {
            dia,
            horaInicio,
            horaFin,
            aula
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/horarios');
            }

        }
    );

};



exports.updateHorario = (req,res)=>{

    const idHorario = req.body.idHorario;

    const dia = req.body.dia;

    const horaInicio = req.body.horaInicio;

    const horaFin = req.body.horaFin;

    const aula = req.body.aula;

    conexion.query(
        'UPDATE CHorarios SET ? WHERE idHorario = ?',
        [
            {
                dia,
                horaInicio,
                horaFin,
                aula
            },
            idHorario
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/horarios');
            }

        }
    );

};


//CIntendencia
exports.saveIntendencia = (req,res)=>{

    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const area = req.body.area;
    const turno = req.body.turno;

    conexion.query(
        'INSERT INTO CIntendencia SET ?',
        {
            nombre,
            telefono,
            area,
            turno
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/intendencia');
            }

        }
    );

};



exports.updateIntendencia = (req,res)=>{

    const idEmpleado = req.body.idEmpleado;

    const nombre = req.body.nombre;

    const telefono = req.body.telefono;

    const area = req.body.area;

    const turno = req.body.turno;

    conexion.query(
        'UPDATE CIntendencia SET ? WHERE idEmpleado = ?',
        [
            {
                nombre,
                telefono,
                area,
                turno
            },
            idEmpleado
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/intendencia');
            }

        }
    );

};


//CEstados
exports.saveEstado = (req,res)=>{

    const nombre = req.body.nombre;

    conexion.query(
        'INSERT INTO CEstados SET ?',
        {
            nombre
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/estados');
            }

        }
    );

};



exports.updateEstado = (req,res)=>{

    const idEstado = req.body.idEstado;

    const nombre = req.body.nombre;

    conexion.query(
        'UPDATE CEstados SET ? WHERE idEstado = ?',
        [
            {
                nombre
            },
            idEstado
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/estados');
            }

        }
    );

};


//municipios
exports.saveMunicipio = (req,res)=>{

    const nombre = req.body.nombre;

    const idEstado = req.body.idEstado;

    conexion.query(
        'INSERT INTO CMunicipio SET ?',
        {
            nombre,
            idEstado
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/municipios');

            }

        }
    );

};



exports.updateMunicipio = (req,res)=>{

    const idMunicipio = req.body.idMunicipio;

    const nombre = req.body.nombre;

    const idEstado = req.body.idEstado;

    conexion.query(
        'UPDATE CMunicipio SET ? WHERE idMunicipio = ?',
        [
            {
                nombre,
                idEstado
            },
            idMunicipio
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/municipios');

            }

        }
    );

};


//localidad
exports.saveLocalidad = (req,res)=>{

    const nombre = req.body.nombre;

    const idMunicipio = req.body.idMunicipio;

    conexion.query(
        'INSERT INTO CLocalidad SET ?',
        {
            nombre,
            idMunicipio
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/localidades');
            }

        }
    );

};



exports.updateLocalidad = (req,res)=>{

    const idLocalidad = req.body.idLocalidad;

    const nombre = req.body.nombre;

    const idMunicipio = req.body.idMunicipio;

    conexion.query(
        'UPDATE CLocalidad SET ? WHERE idLocalidad = ?',
        [
            {
                nombre,
                idMunicipio
            },
            idLocalidad
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/localidades');
            }

        }
    );

};


//genero
exports.saveGenero = (req,res)=>{

    const genero = req.body.genero;

    conexion.query(
        'INSERT INTO Genero SET ?',
        {
            genero
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/generos');
            }

        }
    );

};



exports.updateGenero = (req,res)=>{

    const idGenero = req.body.idGenero;

    const genero = req.body.genero;

    conexion.query(
        'UPDATE Genero SET ? WHERE idGenero = ?',
        [
            {
                genero
            },
            idGenero
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/generos');
            }

        }
    );

};


//datos personales
exports.saveDatosPersonales = (req,res)=>{

    const {
        nombre,
        apellidoP,
        apellidoM,
        fechaNacimiento,
        telefono,
        email,
        curp,
        calle,
        numE,
        numI,
        cp,
        idLocalidad,
        idMunicipio,
        idEstado,
        idGenero
    } = req.body;

    conexion.query(
        'INSERT INTO CDatosPersonales SET ?',
        {
            nombre,
            apellidoP,
            apellidoM,
            fechaNacimiento,
            telefono,
            email,
            curp,
            calle,
            numE,
            numI,
            cp,
            idLocalidad,
            idMunicipio,
            idEstado,
            idGenero
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/datospersonales');
            }

        }
    );

};



exports.updateDatosPersonales = (req,res)=>{

    const idDatosP = req.body.idDatosP;

    const {
        nombre,
        apellidoP,
        apellidoM,
        fechaNacimiento,
        telefono,
        email,
        curp,
        calle,
        numE,
        numI,
        cp,
        idLocalidad,
        idMunicipio,
        idEstado,
        idGenero
    } = req.body;

    conexion.query(
        'UPDATE CDatosPersonales SET ? WHERE idDatosP = ?',
        [
            {
                nombre,
                apellidoP,
                apellidoM,
                fechaNacimiento,
                telefono,
                email,
                curp,
                calle,
                numE,
                numI,
                cp,
                idLocalidad,
                idMunicipio,
                idEstado,
                idGenero
            },
            idDatosP
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/datospersonales');
            }

        }
    );

};


//tipo personal
exports.saveTipoPersonal = (req,res)=>{

    const personal = req.body.personal;

    conexion.query(
        'INSERT INTO CTipoPersonal SET ?',
        {
            personal: personal
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/tipopersonal');
            }

        }
    );

};



exports.updateTipoPersonal = (req,res)=>{

    const idTipo = req.body.idTipo;
    const personal = req.body.personal;

    conexion.query(
        'UPDATE CTipoPersonal SET ? WHERE idTipo = ?',
        [
            {
                personal: personal
            },
            idTipo
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{
                res.redirect('/tipopersonal');
            }

        }
    );

};


// personal
exports.savePersonal = (req,res)=>{

    const {
        idDatosP,
        idTipo,
        claveEmp,
        status
    } = req.body;

    conexion.query(
        'INSERT INTO CPersonal SET ?',
        {
            idDatosP,
            idTipo,
            claveEmp,
            status
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/personal');

            }

        }
    );

};



exports.updatePersonal = (req,res)=>{

    const idPersonal = req.body.idPersonal;

    const {
        idDatosP,
        idTipo,
        claveEmp,
        status
    } = req.body;

    conexion.query(
        'UPDATE CPersonal SET ? WHERE idPersonal = ?',
        [
            {
                idDatosP,
                idTipo,
                claveEmp,
                status
            },
            idPersonal
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/personal');

            }

        }
    );

};


//carreras
exports.saveCarrera = (req,res)=>{

    const {
        nombreCarreras,
        estatus
    } = req.body;

    conexion.query(
        'INSERT INTO CCarreras SET ?',
        {
            nombreCarreras,
            estatus
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/carreras');

            }

        }
    );

};



exports.updateCarrera = (req,res)=>{

    const idCarrera = req.body.idCarrera;

    const {
        nombreCarreras,
        estatus
    } = req.body;

    conexion.query(
        'UPDATE CCarreras SET ? WHERE idCarrera = ?',
        [
            {
                nombreCarreras,
                estatus
            },
            idCarrera
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/carreras');

            }

        }
    );

};


//alumno
exports.saveAlumno = (req,res)=>{

    const {
        matricula,
        idCarrera,
        idDatosP,
        status
    } = req.body;

    conexion.query(
        'INSERT INTO CAlumnos SET ?',
        {
            matricula,
            idCarrera,
            idDatosP,
            status
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/alumnos');

            }

        }
    );

};



exports.updateAlumno = (req,res)=>{

    const {
        matricula,
        idCarrera,
        idDatosP,
        status
    } = req.body;

    conexion.query(
        'UPDATE CAlumnos SET ? WHERE matricula = ?',
        [
            {
                idCarrera,
                idDatosP,
                status
            },
            matricula
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/alumnos');

            }

        }
    );

};


//datos escuela
exports.saveEscuela = (req,res)=>{

    const {
        cct,
        nombre,
        telefono,
        email,
        calle,
        numE,
        numI,
        cp
    } = req.body;

    conexion.query(
        'INSERT INTO CDatosEscuela SET ?',
        {
            cct,
            nombre,
            telefono,
            email,
            calle,
            numE,
            numI,
            cp
        },
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/escuela');

            }

        }
    );

};



exports.updateEscuela = (req,res)=>{

    const {
        cct,
        nombre,
        telefono,
        email,
        calle,
        numE,
        numI,
        cp
    } = req.body;

    conexion.query(
        'UPDATE CDatosEscuela SET ? WHERE cct = ?',
        [
            {
                nombre,
                telefono,
                email,
                calle,
                numE,
                numI,
                cp
            },
            cct
        ],
        (error)=>{

            if(error){
                console.log(error);
            }else{

                res.redirect('/escuela');

            }

        }
    );

};
/*const conexion = require('../database/db'); //llamar la base de datos

exports.save = (req, res)=>{  //capturar datos
    const user = req.body.user;
    const rol = req.body.rol;
    conexion.query('INSERT INTO users SET ?', {user:user, rol:rol}, (error, results)=>{
        if(error){
            console.log(error);    
        }else{
            res.redirect('/');
        }
    })
};

exports.update = (req, res)=>{  //editar datos
    const id = req.body.id;
    const user = req.body.user;
    const rol = req.body.rol;
    conexion.query('UPDATE users SET ? WHERE id = ?', [{user:user, rol:rol}, id], (error, results)=>{
        if(error){
            console.log(error);    
        }else{
            res.redirect('/');
        }
    })
}*/