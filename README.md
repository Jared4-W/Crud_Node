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
* MySQL Server 
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
mysql -u root -p control_escolar < database/Crud_Node_Control_Escolar_Railway - Render.sql
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

Nota: curp_token si debe ir como esta o conseguir uno propio en: https://api.valida-curp.com.mx/
```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=control_escolar
CURP_TOKEN=pruebas
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

# Despliegue

## Arquitectura del Proyecto

El sistema utiliza una arquitectura distribuida donde la aplicación web se encuentra alojada en Render y la base de datos en Railway.

```text
Usuario
   │
   ▼
Render (Node.js + Express)
   │
   ▼
Railway (MySQL)
```

### Render

Render aloja la aplicación web desarrollada con:

- Node.js
- Express.js
- EJS
- JWT
- Cookie Parser

Es el encargado de:

- Mostrar las vistas del sistema.
- Gestionar las rutas del proyecto.
- Procesar formularios enviados por los usuarios.
- Autenticar usuarios mediante JSON Web Token (JWT).
- Administrar las sesiones mediante cookies.
- Comunicarse con la base de datos alojada en Railway.

### Railway

Railway aloja la base de datos MySQL utilizada por el sistema.

La base de datos almacena toda la información relacionada con:

- Usuarios
- Roles
- Alumnos
- Carreras
- Asignaturas
- Horarios
- Datos personales
- Estados
- Municipios
- Localidades

---

# Despliegue de la Base de Datos en Railway

## 1. Crear una cuenta

Ingresar a Railway y crear una cuenta o iniciar sesión.

https://railway.com

---

## 2. Crear un nuevo proyecto

Seleccionar:

```text
New Project
```

---

## 3. Agregar el servicio MySQL

Dentro del proyecto seleccionar:

```text
Add Service
```

Posteriormente:

```text
Database
```

Y elegir:

```text
MySQL
```

Railway creará automáticamente una instancia MySQL.

---

## 4. Obtener las credenciales de conexión

Dentro del servicio MySQL abrir la pestaña:

```text
Variables
```

Railway mostrará valores similares a:

```env
MYSQLHOST=
MYSQLPORT=
MYSQLDATABASE=
MYSQLUSER=
MYSQLPASSWORD=
```

Estas credenciales serán utilizadas posteriormente por la aplicación Node.js para conectarse a la base de datos.

---

## 5. Importar la Base de Datos

### Método A: MySQL Workbench

1. Crear una nueva conexión utilizando las credenciales proporcionadas por Railway.
2. Conectarse al servidor MySQL.
3. Abrir el archivo:

```text
database/control_escolar.sql
```

4. Ejecutar el script completo utilizando el botón Execute (⚡).

Esto creará automáticamente todas las tablas y registros necesarios para el funcionamiento del sistema.

---

### Método B: Línea de Comandos

Ejecutar:

```bash
mysql -h HOST_RAILWAY -u USUARIO_RAILWAY -p DATABASE_RAILWAY < database/control_escolar.sql
```

Reemplazando los valores por los proporcionados por Railway.

---

## 6. Verificar la Importación

Una vez importada la base de datos, ejecutar:

```sql
SHOW TABLES;
```

Deberán aparecer tablas similares a:

```text
calumnos
casignaturas
ccarreras
cdatospersonales
cestados
chorarios
...
```

Si las tablas aparecen correctamente, la importación fue exitosa.

---

# Despliegue de la Aplicación en Render

## 1. Crear una cuenta

Ingresar a Render y crear una cuenta o iniciar sesión.

https://render.com

---

## 2. Conectar GitHub

1. Seleccionar:

```text
New +
```

2. Elegir:

```text
Web Service
```

3. Conectar la cuenta de GitHub.
4. Seleccionar el repositorio del proyecto.

---

## 3. Configuración del Servicio

Configurar los siguientes parámetros:

### Runtime

```text
Node
```

### Build Command

```bash
npm install
```

### Start Command

```bash
node app.js
```

---

## 4. Configurar las Variables de Entorno

En la sección:

```text
Environment
```

agregar las variables necesarias para la conexión.

Ejemplo:

```env
PORT=5000

DB_HOST=HOST_RAILWAY
DB_USER=USUARIO_RAILWAY
DB_PASSWORD=PASSWORD_RAILWAY
DB_NAME=DATABASE_RAILWAY
DB_PORT=PUERTO_RAILWAY

JWT_SECRET=TU_CLAVE_SECRETA

CURP_TOKEN=TU_TOKEN_CURP
```

### Descripción de Variables

| Variable | Descripción |
|-----------|-------------|
| PORT | Puerto utilizado por la aplicación |
| DB_HOST | Host de la base de datos MySQL |
| DB_USER | Usuario de MySQL |
| DB_PASSWORD | Contraseña de MySQL |
| DB_NAME | Nombre de la base de datos |
| DB_PORT | Puerto utilizado por MySQL |
| JWT_SECRET | Clave utilizada para generar y verificar JWT |
| CURP_TOKEN | Token utilizado para consumir la API de validación de CURP |

---

## 5. Crear el Servicio

Una vez configurados todos los parámetros:

```text
Create Web Service
```

Render realizará automáticamente:

1. Descarga del repositorio desde GitHub.
2. Instalación de dependencias mediante:

```bash
npm install
```

3. Inicio de la aplicación mediante:

```bash
node app.js
```

---

# Verificación del Despliegue

Una vez finalizado el despliegue:

1. Abrir la URL proporcionada por Render.
2. Acceder al sistema.
3. Iniciar sesión.
4. Verificar acceso a los módulos disponibles.
5. Crear registros de prueba.
6. Confirmar que la información se almacena correctamente en Railway.

Si los registros aparecen en la base de datos, la conexión entre Render y Railway está funcionando correctamente.

---

# Flujo de Funcionamiento del Sistema

Cuando un usuario interactúa con la aplicación ocurre el siguiente proceso:

```text
Usuario
   │
   ▼
Render
   │
   ├── Procesa Login
   ├── Verifica JWT
   ├── Gestiona Rutas
   ├── Procesa Formularios
   └── Renderiza Vistas
   │
   ▼
Railway
   │
   ├── Guarda Usuarios
   ├── Guarda Alumnos
   ├── Guarda Carreras
   ├── Guarda Horarios
   ├── Guarda Asignaturas
   └── Guarda Datos Personales
```


# Consideraciones de Seguridad

- No subir el archivo `.env` al repositorio.
- Utilizar variables de entorno para almacenar credenciales.
- Mantener protegida la clave utilizada para JWT.
- Mantener protegido el token utilizado para la validación de CURP.
- Utilizar únicamente las credenciales proporcionadas por Railway.
- Aprovechar el certificado HTTPS generado automáticamente por Render.
- No almacenar contraseñas reales dentro de archivos SQL públicos.

---

# Resultado Final

Al completar correctamente todos los pasos:

- La aplicación Node.js se ejecutará en Render.
- La base de datos MySQL se ejecutará en Railway.
- Los usuarios podrán acceder al sistema mediante HTTPS.
- La información será almacenada de forma remota en Railway.
- El sistema podrá ser clonado, configurado y ejecutado por cualquier desarrollador siguiendo las instrucciones de este README.

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
