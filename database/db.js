const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'FACEbok9/*',
    database: 'control_escolar'
});

conexion.connect((error)=>{
    if(error){
        console.log('El error de conexion es: ' + error);
        return;
    }
    console.log('¡Conectado a control_escolar!');
});

module.exports = conexion;
