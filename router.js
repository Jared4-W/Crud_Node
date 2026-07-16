const express = require('express');
const router = express.Router();

const conexion = require('./database/db');
const crud = require('./controllers/crud');

const verificarSesion = require('./middlewares/auth');
const soloAdmin = require('./middlewares/admin');

// error login
router.get('/error', (req,res)=>{

    res.render('error');

});

// página principal
router.get('/',(req,res)=>{

    res.render('login');

});
router.post(
    '/login',
    crud.login
);

/*router.get('/', (req, res)=>{
     res.redirect('/asignaturas');
})*/


// mostrar asignaturas
router.get('/asignaturas', verificarSesion,(req, res)=>{

    conexion.query('SELECT * FROM CAsignaturas', (error, results)=>{

        if(error){
            throw error;
        }else{
            res.render('asignaturas/index', {
                results: results
            });
        }

    });

});


// vista crear
router.get('/asignaturas/create', verificarSesion, editorOAdmin,(req,res)=>{
    res.render('asignaturas/create');
});


// guardar
router.post('/asignaturas/save', verificarSesion,
    editorOAdmin, crud.saveAsignatura);


// editar
router.get('/asignaturas/edit/:idAsignatura', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idAsignatura;

    conexion.query(
        'SELECT * FROM CAsignaturas WHERE idAsignatura = ?',
        [id],
        (error, results)=>{

            if(error){
                throw error;
            }else{
                res.render('asignaturas/edit',{
                    user: results[0]
                });
            }

        }
    );

});


// actualizar
router.post('/asignaturas/update', verificarSesion,
    editorOAdmin, crud.updateAsignatura);


// eliminar
router.get('/asignaturas/delete/:idAsignatura', verificarSesion,
    soloAdmin,(req,res)=>{

    const id = req.params.idAsignatura;

    conexion.query(
        'DELETE FROM CAsignaturas WHERE idAsignatura = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{
                res.redirect('/asignaturas');
            }

        }
    );

});




//CHorarios
router.get('/horarios', verificarSesion,(req,res)=>{

    conexion.query(
        'SELECT * FROM CHorarios',
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render('horarios/index',{
                    results: results
                });

            }

        }
    );

});

router.get('/horarios/create', verificarSesion, editorOAdmin,(req,res)=>{

    res.render('horarios/create');

});

router.get('/horarios/edit/:idHorario', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idHorario;

    conexion.query(
        'SELECT * FROM CHorarios WHERE idHorario = ?',
        [id],
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'horarios/edit',
                    {
                        horario: results[0]
                    }
                );

            }

        }
    );

});

router.get('/horarios/delete/:idHorario', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idHorario;

    conexion.query(
        'DELETE FROM CHorarios WHERE idHorario = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{
                res.redirect('/horarios');
            }

        }
    );

});

router.post('/horarios/save', verificarSesion,
    editorOAdmin, crud.saveHorario);

router.post('/horarios/update', verificarSesion,
    editorOAdmin, crud.updateHorario);



//CIntendencia
router.get('/intendencia', verificarSesion,(req,res)=>{

    conexion.query(
        'SELECT * FROM CIntendencia',
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'intendencia/index',
                    {
                        results: results
                    }
                );

            }

        }
    );

});

router.get('/intendencia/create', verificarSesion, editorOAdmin,(req,res)=>{

    res.render('intendencia/create');

});

router.post('/intendencia/save', verificarSesion,
    editorOAdmin, crud.saveIntendencia);

router.get('/intendencia/edit/:idEmpleado', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idEmpleado;

    conexion.query(
        'SELECT * FROM CIntendencia WHERE idEmpleado = ?',
        [id],
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'intendencia/edit',
                    {
                        empleado: results[0]
                    }
                );

            }

        }
    );

});

router.post('/intendencia/update', verificarSesion,
    editorOAdmin, crud.updateIntendencia);

router.get('/intendencia/delete/:idEmpleado', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idEmpleado;

    conexion.query(
        'DELETE FROM CIntendencia WHERE idEmpleado = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/intendencia');

            }

        }
    );

});


//CEstados
router.get('/estados', verificarSesion,(req,res)=>{

    conexion.query(
        'SELECT * FROM CEstados',
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'estados/index',
                    {
                        results: results
                    }
                );

            }

        }
    );

});

router.get('/estados/create', verificarSesion, editorOAdmin,(req,res)=>{

    res.render('estados/create');

});

router.post('/estados/save', verificarSesion,
    editorOAdmin, crud.saveEstado);

router.get('/estados/edit/:idEstado', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idEstado;

    conexion.query(
        'SELECT * FROM CEstados WHERE idEstado = ?',
        [id],
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'estados/edit',
                    {
                        estado: results[0]
                    }
                );

            }

        }
    );

});

router.post('/estados/update', verificarSesion,
    editorOAdmin, crud.updateEstado);

router.get('/estados/delete/:idEstado', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idEstado;

    conexion.query(
        'DELETE FROM CEstados WHERE idEstado = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/estados');

            }

        }
    );

});


//municipios
router.get('/municipios', verificarSesion,(req,res)=>{

    conexion.query(
        `
        SELECT
            CMunicipio.idMunicipio,
            CMunicipio.nombre,
            CEstados.nombre AS estado
        FROM CMunicipio
        INNER JOIN CEstados
        ON CMunicipio.idEstado = CEstados.idEstado
        `,
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'municipios/index',
                    {
                        results: results
                    }
                );

            }

        }
    );

});

router.get('/municipios/create', verificarSesion, editorOAdmin,(req,res)=>{

    conexion.query(
        'SELECT * FROM CEstados',
        (error, estados)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'municipios/create',
                    {
                        estados: estados
                    }
                );

            }

        }
    );

});

router.post('/municipios/save', verificarSesion,
    editorOAdmin, crud.saveMunicipio);

router.get('/municipios/edit/:idMunicipio', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idMunicipio;

    conexion.query(
        'SELECT * FROM CMunicipio WHERE idMunicipio = ?',
        [id],
        (error, municipio)=>{

            if(error){
                throw error;
            }

            conexion.query(
                'SELECT * FROM CEstados',
                (error, estados)=>{

                    if(error){
                        throw error;
                    }else{

                        res.render(
                            'municipios/edit',
                            {
                                municipio: municipio[0],
                                estados: estados
                            }
                        );

                    }

                }
            );

        }
    );

});

router.post('/municipios/update', verificarSesion,
    editorOAdmin, crud.updateMunicipio);

router.get('/municipios/delete/:idMunicipio', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idMunicipio;

    conexion.query(
        'DELETE FROM CMunicipio WHERE idMunicipio = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/municipios');

            }

        }
    );

});


//localidad
router.get('/localidades', verificarSesion,(req,res)=>{

    conexion.query(
        `
        SELECT
            CLocalidad.idLocalidad,
            CLocalidad.nombre,
            CMunicipio.nombre AS municipio
        FROM CLocalidad
        INNER JOIN CMunicipio
        ON CLocalidad.idMunicipio = CMunicipio.idMunicipio
        `,
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'localidades/index',
                    {
                        results: results
                    }
                );

            }

        }
    );

});

router.get('/localidades/create', verificarSesion, editorOAdmin,(req,res)=>{

    conexion.query(
        'SELECT * FROM CMunicipio',
        (error, municipios)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'localidades/create',
                    {
                        municipios: municipios
                    }
                );

            }

        }
    );

});

router.post('/localidades/save', verificarSesion,
    editorOAdmin, crud.saveLocalidad);

router.get('/localidades/edit/:idLocalidad', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idLocalidad;

    conexion.query(
        'SELECT * FROM CLocalidad WHERE idLocalidad = ?',
        [id],
        (error, localidad)=>{

            if(error){
                throw error;
            }

            conexion.query(
                'SELECT * FROM CMunicipio',
                (error, municipios)=>{

                    if(error){
                        throw error;
                    }else{

                        res.render(
                            'localidades/edit',
                            {
                                localidad: localidad[0],
                                municipios: municipios
                            }
                        );

                    }

                }
            );

        }
    );

});

router.post('/localidades/update', verificarSesion,
    editorOAdmin, crud.updateLocalidad);

router.get('/localidades/delete/:idLocalidad', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idLocalidad;

    conexion.query(
        'DELETE FROM CLocalidad WHERE idLocalidad = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/localidades');

            }

        }
    );

});


//genero
router.get('/generos', verificarSesion,(req,res)=>{

    conexion.query(
        'SELECT * FROM Genero',
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'generos/index',
                    {
                        results: results
                    }
                );

            }

        }
    );

});

router.get('/generos/create', verificarSesion, editorOAdmin,(req,res)=>{

    res.render('generos/create');

});

router.post('/generos/save', verificarSesion,
    editorOAdmin, crud.saveGenero);

router.get('/generos/edit/:idGenero', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idGenero;

    conexion.query(
        'SELECT * FROM Genero WHERE idGenero = ?',
        [id],
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'generos/edit',
                    {
                        genero: results[0]
                    }
                );

            }

        }
    );

});

router.post('/generos/update', verificarSesion,
    editorOAdmin, crud.updateGenero);

router.get('/generos/delete/:idGenero', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idGenero;

    conexion.query(
        'DELETE FROM Genero WHERE idGenero = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/generos');

            }

        }
    );

});


//datos personales
router.get('/datospersonales', verificarSesion,(req,res)=>{

    conexion.query(
        `
        SELECT
            dp.*,
            e.nombre AS estado,
            m.nombre AS municipio,
            l.nombre AS localidad,
            g.genero
        FROM CDatosPersonales dp

        LEFT JOIN CEstados e
        ON dp.idEstado = e.idEstado

        LEFT JOIN CMunicipio m
        ON dp.idMunicipio = m.idMunicipio

        LEFT JOIN CLocalidad l
        ON dp.idLocalidad = l.idLocalidad

        LEFT JOIN Genero g
        ON dp.idGenero = g.idGenero
        `,
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'datospersonales/index',
                    {
                        results: results
                    }
                );

            }

        }
    );

});

router.get('/datospersonales/create', verificarSesion, editorOAdmin,(req,res)=>{

    conexion.query(
        'SELECT * FROM CEstados',
        (error, estados)=>{

            if(error) throw error;

            conexion.query(
                'SELECT * FROM CMunicipio',
                (error, municipios)=>{

                    if(error) throw error;

                    conexion.query(
                        'SELECT * FROM CLocalidad',
                        (error, localidades)=>{

                            if(error) throw error;

                            conexion.query(
                                'SELECT * FROM Genero',
                                (error, generos)=>{

                                    if(error) throw error;

                                    res.render(
                                        'datospersonales/create',
                                        {
                                            estados,
                                            municipios,
                                            localidades,
                                            generos
                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

});

router.get('/datospersonales/edit/:idDatosP', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idDatosP;

    conexion.query(
        'SELECT * FROM CDatosPersonales WHERE idDatosP = ?',
        [id],
        (error, persona)=>{

            if(error){
                throw error;
            }

            conexion.query(
                'SELECT * FROM CEstados',
                (error, estados)=>{

                    conexion.query(
                        'SELECT * FROM CMunicipio',
                        (error, municipios)=>{

                            conexion.query(
                                'SELECT * FROM CLocalidad',
                                (error, localidades)=>{

                                    conexion.query(
                                        'SELECT * FROM Genero',
                                        (error, generos)=>{

                                            res.render(
                                                'datospersonales/edit',
                                                {
                                                    persona: persona[0],
                                                    estados,
                                                    municipios,
                                                    localidades,
                                                    generos
                                                }
                                            );

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

});

router.post('/datospersonales/save', verificarSesion,
    editorOAdmin, crud.saveDatosPersonales);

router.post('/datospersonales/update', verificarSesion,
    editorOAdmin, crud.updateDatosPersonales);

router.get('/datospersonales/delete/:idDatosP', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idDatosP;

    conexion.query(
        'DELETE FROM CDatosPersonales WHERE idDatosP = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/datospersonales');

            }

        }
    );

});


// CTipoPersonal

router.get('/tipopersonal', verificarSesion,(req,res)=>{

    conexion.query(
        'SELECT * FROM CTipoPersonal',
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'tipopersonal/index',
                    {
                        results: results
                    }
                );

            }

        }
    );

});


router.get('/tipopersonal/create', verificarSesion, editorOAdmin,(req,res)=>{

    res.render('tipopersonal/create');

});


router.post('/tipopersonal/save', verificarSesion,
    editorOAdmin, crud.saveTipoPersonal);


router.get('/tipopersonal/edit/:idTipo', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idTipo;

    conexion.query(
        'SELECT * FROM CTipoPersonal WHERE idTipo = ?',
        [id],
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'tipopersonal/edit',
                    {
                        tipo: results[0]
                    }
                );

            }

        }
    );

});


router.post('/tipopersonal/update', verificarSesion,
    editorOAdmin, crud.updateTipoPersonal);


router.get('/tipopersonal/delete/:idTipo', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idTipo;

    conexion.query(
        'DELETE FROM CTipoPersonal WHERE idTipo = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/tipopersonal');

            }

        }
    );

});


// CPersonal

router.get('/personal', verificarSesion,(req,res)=>{

    conexion.query(
        `
        SELECT
            cp.idPersonal,
            cp.claveEmp,
            cp.status,
            cp.idTipo,
            tp.personal,
            dp.idDatosP,
            dp.nombre,
            dp.fechaNacimiento,
            dp.curp,
            dp.email,
            dp.telefono,
            dp.calle,
            dp.numE,
            dp.numI,
            dp.cp
        FROM CPersonal cp
        INNER JOIN CTipoPersonal tp
            ON cp.idTipo = tp.idTipo
        INNER JOIN CDatosPersonales dp
            ON cp.idDatosP = dp.idDatosP
        `,
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'personal/index',
                    {
                        results: results
                    }
                );

            }

        }
    );

});



router.get('/personal/create', verificarSesion, editorOAdmin,(req,res)=>{

    conexion.query(
        'SELECT idDatosP FROM CDatosPersonales',
        (error, datos)=>{

            if(error){
                throw error;
            }

            conexion.query(
                'SELECT * FROM CTipoPersonal',
                (error, tipos)=>{

                    if(error){
                        throw error;
                    }else{

                        res.render(
                            'personal/create',
                            {
                                datos,
                                tipos
                            }
                        );

                    }

                }
            );

        }
    );

});


router.post('/personal/save', verificarSesion,
    editorOAdmin, crud.savePersonal);



router.get('/personal/edit/:idPersonal', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idPersonal;

    conexion.query(
        'SELECT * FROM CPersonal WHERE idPersonal = ?',
        [id],
        (error, personal)=>{

            if(error){
                throw error;
            }

            conexion.query(
                'SELECT idDatosP FROM CDatosPersonales',
                (error, datos)=>{

                    if(error){
                        throw error;
                    }

                    conexion.query(
                        'SELECT * FROM CTipoPersonal',
                        (error, tipos)=>{

                            if(error){
                                throw error;
                            }else{

                                res.render(
                                    'personal/edit',
                                    {
                                        empleado: personal[0],
                                        datos,
                                        tipos
                                    }
                                );

                            }

                        }
                    );

                }
            );

        }
    );

});


router.post('/personal/update', verificarSesion,
    editorOAdmin, crud.updatePersonal);



router.get('/personal/delete/:idPersonal', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idPersonal;

    conexion.query(
        'DELETE FROM CPersonal WHERE idPersonal = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/personal');

            }

        }
    );

});


// CCarreras

router.get('/carreras', verificarSesion,(req,res)=>{

    conexion.query(
        'SELECT * FROM CCarreras',
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'carreras/index',
                    {
                        results: results
                    }
                );

            }

        }
    );

});


router.get('/carreras/create', verificarSesion, editorOAdmin,(req,res)=>{

    res.render('carreras/create');

});


router.post('/carreras/save', verificarSesion,
    editorOAdmin, crud.saveCarrera);


router.get('/carreras/edit/:idCarrera', verificarSesion,
    editorOAdmin, (req,res)=>{

    const id = req.params.idCarrera;

    conexion.query(
        'SELECT * FROM CCarreras WHERE idCarrera = ?',
        [id],
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'carreras/edit',
                    {
                        carrera: results[0]
                    }
                );

            }

        }
    );

});


router.post('/carreras/update', verificarSesion,
    editorOAdmin, crud.updateCarrera);


router.get('/carreras/delete/:idCarrera', verificarSesion,
soloAdmin,(req,res)=>{

    const id = req.params.idCarrera;

    conexion.query(
        'DELETE FROM CCarreras WHERE idCarrera = ?',
        [id],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/carreras');

            }

        }
    );

});


// CAlumnos

router.get('/alumnos', verificarSesion,(req,res)=>{

    conexion.query(
        `
        SELECT
            ca.matricula,
            ca.idCarrera,
            cc.nombreCarreras,
            cc.estatus,
            ca.idDatosP,
            dp.nombre,
            dp.fechaNacimiento,
            dp.curp,
            dp.email,
            dp.telefono,
            dp.calle,
            dp.numE,
            dp.numI,
            dp.cp,
            ca.status
        FROM CAlumnos ca

        INNER JOIN CCarreras cc
            ON ca.idCarrera = cc.idCarrera

        INNER JOIN CDatosPersonales dp
            ON ca.idDatosP = dp.idDatosP
        `,
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'alumnos/index',
                    {
                        results
                    }
                );

            }

        }
    );

});



router.get('/alumnos/create', verificarSesion, editorOAdmin,(req,res)=>{

    conexion.query(
        'SELECT idCarrera FROM CCarreras',
        (error, carreras)=>{

            if(error) throw error;

            conexion.query(
                'SELECT idDatosP FROM CDatosPersonales',
                (error, datos)=>{

                    if(error) throw error;

                    res.render(
                        'alumnos/create',
                        {
                            carreras,
                            datos
                        }
                    );

                }
            );

        }
    );

});


router.post('/alumnos/save', verificarSesion,
    editorOAdmin, crud.saveAlumno);



router.get('/alumnos/edit/:matricula', verificarSesion,
    editorOAdmin, (req,res)=>{

    const matricula = req.params.matricula;

    conexion.query(
        'SELECT * FROM CAlumnos WHERE matricula = ?',
        [matricula],
        (error, alumno)=>{

            if(error) throw error;

            conexion.query(
                'SELECT idCarrera FROM CCarreras',
                (error, carreras)=>{

                    if(error) throw error;

                    conexion.query(
                        'SELECT idDatosP FROM CDatosPersonales',
                        (error, datos)=>{

                            if(error) throw error;

                            res.render(
                                'alumnos/edit',
                                {
                                    alumno: alumno[0],
                                    carreras,
                                    datos
                                }
                            );

                        }
                    );

                }
            );

        }
    );

});


router.post('/alumnos/update', verificarSesion,
    editorOAdmin, crud.updateAlumno);



router.get('/alumnos/delete/:matricula', verificarSesion,
soloAdmin,(req,res)=>{

    const matricula = req.params.matricula;

    conexion.query(
        'DELETE FROM CAlumnos WHERE matricula = ?',
        [matricula],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/alumnos');

            }

        }
    );

});


// CDatosEscuela

router.get('/escuela', verificarSesion,(req,res)=>{

    conexion.query(
        'SELECT * FROM CDatosEscuela',
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'escuela/index',
                    {
                        results
                    }
                );

            }

        }
    );

});


router.get('/escuela/create', verificarSesion, editorOAdmin,(req,res)=>{

    res.render('escuela/create');

});


router.post('/escuela/save', verificarSesion,
    editorOAdmin, crud.saveEscuela);



router.get('/escuela/edit/:cct', verificarSesion,
    editorOAdmin, (req,res)=>{

    const cct = req.params.cct;

    conexion.query(
        'SELECT * FROM CDatosEscuela WHERE cct = ?',
        [cct],
        (error, results)=>{

            if(error){
                throw error;
            }else{

                res.render(
                    'escuela/edit',
                    {
                        escuela: results[0]
                    }
                );

            }

        }
    );

});


router.post('/escuela/update', verificarSesion,
    editorOAdmin, crud.updateEscuela);



router.get('/escuela/delete/:cct', verificarSesion,
soloAdmin,(req,res)=>{

    const cct = req.params.cct;

    conexion.query(
        'DELETE FROM CDatosEscuela WHERE cct = ?',
        [cct],
        (error)=>{

            if(error){
                throw error;
            }else{

                res.redirect('/escuela');

            }

        }
    );

});

module.exports = router;


/*const express = require('express');
const conexion = require('./database/db');
const router = express.Router();

router.get('/', (req, res)=>{
    
     conexion.query('SELECT * FROM users', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index', {results: results});
        }
    }) 
})

router.get('/create', (req, res)=>{  //ruta para crear registros
    res.render('create');
})

router.get('/edit/:id', (req, res)=>{  //ruta para editar registros
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {user:results[0]});
        }
    })
})

router.get('/delete/:id', (req, res)=>{  //ruta para eliminar registros
    const id = req.params.id;
    conexion.query('DELETE FROM users WHERE id = ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    })
})

const crud = require('./controllers/crud'); //invocar metodos al crud
router.post('/save', crud.save);  //referenciar para guardar
router.post('/update', crud.update);  //referenciar para editar


module.exports = router;

*/