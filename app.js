const express = require('express');  //referenciar a express
const app = express();  // se invoca express mediante su clase

app.set('view engine', 'ejs');  //invocar motor de plantillas

app.use(express.urlencoded({extended:false}));//definir como guadar datos
app.use(express.json());

app.use('/', require('./router'));  //refrenciar archivo router.js

app.listen(5000, ()=>{    //invocar los metodos de express
console.log('SERVER corriendo en http://localhost:5000');
}); //mostrar mensaje para verificar el proceso junto con enlace


