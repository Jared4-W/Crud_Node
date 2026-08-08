//conexion base de datos con Railway
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;


//conexion base de datos local
/* const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'control_escolar'
});

conexion.connect((error)=>{
    if(error){
        console.log('El error de conexion es: ' + error);
        return;
    }
    console.log('¡Conectado a control_escolar!');
});

module.exports = conexion; */
