# Sistema de Control Escolar

## Descripción

Sistema web de Control Escolar desarrollado con Node.js, Express y MySQL. La aplicación permite la administración de información académica y administrativa mediante módulos CRUD protegidos por autenticación basada en JWT y control de acceso por roles.

El sistema incluye gestión de:

* Asignaturas
* Horarios
* Intendencia
* Estados
* Municipios
* Localidades
* Géneros
* Datos Personales
* Tipos de Personal
* Personal
* Carreras
* Alumnos
* Datos de la Escuela

Todas las operaciones del sistema se encuentran protegidas mediante autenticación y autorización basada en roles.

---

# Características principales

* Autenticación mediante JWT (JSON Web Token).
* Almacenamiento seguro del token en cookies.
* Control de acceso por roles.
* Operaciones CRUD completas.
* Integración con MySQL.
* Plantillas renderizadas en el servidor mediante EJS.
* Protección de rutas privadas.
* Restricción de operaciones sensibles según permisos.

---

# Tecnologías utilizadas

## Backend

* Node.js
* Express.js
* JSON Web Token (JWT)
* Cookie Parser

## Base de datos

* MySQL

## Frontend

* EJS
* HTML
* CSS
* JavaScript

---

# Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js (versión 18 o superior recomendada)
* npm
* MySQL Workbench 
* Git

Verificar instalación:

```bash
node -v
npm -v
mysql --version
```

---

# Clonar el repositorio

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
```

Entrar al proyecto:

```bash
cd REPOSITORIO
```

---

# Instalación de dependencias

Instalar todos los paquetes necesarios:

```bash
npm install
```

---

# Configuración de la base de datos

## 1. Crear la base de datos

Ingresar a MySQL y crear la base de datos correspondiente:

```sql
CREATE DATABASE control_escolar;
```

## 2. Importar el script SQL

Importar el archivo SQL incluido en el proyecto:

```bash
mysql -u root -p control_escolar < control_escolar.sql
```

Si el nombre del archivo SQL es diferente, reemplazarlo por el correspondiente.

---

# Configuración de variables de entorno

Crear un archivo llamado:

```text
.env
```

en la raíz del proyecto.

Ejemplo:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=control_escolar

JWT_SECRET=clave_super_secreta_para_jwt
```

## Descripción

| Variable    | Descripción                         |
| ----------- | ----------------------------------- |
| PORT        | Puerto del servidor                 |
| DB_HOST     | Host de MySQL                       |
| DB_USER     | Usuario de MySQL                    |
| DB_PASSWORD | Contraseña de MySQL                 |
| DB_NAME     | Nombre de la base de datos          |
| JWT_SECRET  | Clave utilizada para firmar los JWT |

---

# Ejecución del proyecto

## Modo normal

```bash
npm start
```

o

```bash
node app.js
```

## Modo desarrollo

Si el proyecto utiliza nodemon:

```bash
npm run dev
```

o

```bash
nodemon app.js
```

---

# Acceso al sistema

Abrir el navegador:

```text
http://localhost:5000
```

La aplicación mostrará la pantalla de inicio de sesión.

---

# Seguridad y autenticación

El sistema utiliza JWT para proteger las rutas privadas.

Al iniciar sesión:

1. Se validan las credenciales.
2. Se genera un JWT.
3. El token se almacena en una cookie.
4. El middleware `verificarToken` valida el token en cada petición protegida.

Si el token:

* No existe.
* Está expirado.
* Fue modificado.
* Tiene una firma inválida.

el usuario será redirigido automáticamente al inicio de sesión.

---

# Control de roles

El sistema implementa autorización mediante middleware.

## Administrador

Puede:

* Consultar registros.
* Crear registros.
* Editar registros.
* Eliminar registros.

## Editor

Puede:

* Consultar registros.
* Crear registros.
* Editar registros.

No puede eliminar registros.

---

# Estructura general del proyecto

```text
Proyecto
│
├── controllers/
│   └── crud.js
│
├── database/
│   └── db.js
│
├── middlewares/
│   ├── verificarToken.js
│   ├── admin.js
│   └── editorOAdmin.js
│
├── public/
│
├── routes.js
│
├── views/
│
├── app.js
│
├── package.json
│
└── .env
```

---

# Despliegue en Render

## Variables de entorno

Configurar en Render las siguientes variables:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
PORT=
```

## Inicio del servicio

Comando de instalación:

```bash
npm install
```

Comando de inicio:

```bash
node app.js
```

---

# Solución de problemas

## Error de conexión a MySQL

Verificar:

* Host correcto.
* Usuario correcto.
* Contraseña correcta.
* Base de datos existente.

---

## Error JWT

Verificar:

* Existencia de `JWT_SECRET`.
* Coincidencia de la clave utilizada para firmar y validar tokens.

---

## Página redirige constantemente al login

Posibles causas:

* Token inexistente.
* Cookie eliminada.
* JWT expirado.
* Error en la configuración de variables de entorno.

---

Proyecto desarrollado como sistema de Control Escolar utilizando Node.js, Express, MySQL y JWT para autenticación segura.
