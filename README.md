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
mysql -u root -p control_escolar < database/control_escolar.sql
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

Nota: curp_token si debe ir como esta
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


Seleccionar el servicio **MySQL** y abrir:

```text
Variables
```

Railway proporcionará diferentes variables relacionadas con la conexión.

Entre ellas pueden encontrarse:

```env
MYSQLHOST=
MYSQLPORT=
MYSQLDATABASE=
MYSQLUSER=
MYSQLPASSWORD=
MYSQL_URL=
MYSQL_PUBLIC_URL=
```

Estas variables contienen información necesaria para conectarse al servidor MySQL.

---

# 5. ¿Por qué se debe obtener y usar `MYSQL_PUBLIC_URL`?

`MYSQL_PUBLIC_URL` es una cadena de conexión que permite acceder a la base de datos MySQL de Railway desde fuera del entorno de Railway.

Esto es especialmente importante para este proyecto porque **MySQL Workbench se ejecuta en el equipo local**, mientras que MySQL se encuentra alojado remotamente en Railway.

La URL puede tener una estructura similar a:

```text
mysql://USUARIO:CONTRASEÑA@HOST:PUERTO/BASE_DE_DATOS
```

Por ejemplo:

```text
mysql://root:MiPassword@monorail.proxy.rlwy.net:12345/railway
```

> El ejemplo anterior es únicamente ilustrativo. Los valores reales serán diferentes para cada proyecto de Railway.

---

# 6. ¿Cómo obtener `MYSQL_PUBLIC_URL`?

Para obtenerla:
### Paso 1. Abrir el servicio MySQL

Dentro de tu proyecto en Railway, selecciona el servicio:

```text
MySQL
```

---

### Paso 2. Ir a la configuración de Networking

En la parte superior selecciona:

```text
Settings → Networking
```

---

### Paso 3. Habilitar el acceso público

Dentro de la sección **Networking**, localiza la opción:

```text
Public Access
```

Activa el interruptor para habilitar el acceso público al servicio MySQL.

> **¿Qué hace esta opción?**
>
> Al habilitar **Public Access**, Railway crea un **TCP Proxy** que permite acceder a la base de datos desde fuera de la infraestructura de Railway. Esto hace posible conectarse mediante herramientas externas como **MySQL Workbench**, DBeaver o cualquier cliente compatible con MySQL.

---

# Paso 7. Obtener `MYSQL_PUBLIC_URL`

Una vez habilitado **Public Access**, Railway genera automáticamente una nueva variable de entorno llamada:

```text
MYSQL_PUBLIC_URL
```

Para verla:

1. Regresa al servicio **MySQL**.
2. Abre la pestaña:

```text
Variables
```

3. Busca la variable:

```text
MYSQL_PUBLIC_URL
```

---

# Paso 8. ¿Qué es `MYSQL_PUBLIC_URL`?

`MYSQL_PUBLIC_URL` es una **cadena de conexión completa** que contiene toda la información necesaria para conectarse a la base de datos MySQL desde fuera de Railway.

Su formato general es:

```text
mysql://usuario:contraseña@host:puerto/base_de_datos
```

Ejemplo ilustrativo:

```text
mysql://root:MiPass123@containers-us-west-123.railway.app:6543/railway
```

> **Nota:** El ejemplo anterior es únicamente ilustrativo. Cada proyecto de Railway genera valores diferentes.

---

# Paso 9. Información contenida en `MYSQL_PUBLIC_URL`

La cadena de conexión incluye los siguientes datos:

| Elemento | Descripción |
|----------|-------------|
| `usuario` | Usuario de MySQL. |
| `contraseña` | Contraseña del usuario. |
| `host` | Dirección pública del servidor MySQL. |
| `puerto` | Puerto público asignado por Railway. |
| `base_de_datos` | Nombre de la base de datos creada en Railway. |

Por ejemplo:

```text
mysql://root:MiPass123@containers-us-west-123.railway.app:6543/railway
```

corresponde a:

| Campo | Valor |
|-------|-------|
| Usuario | `root` |
| Contraseña | `MiPass123` |
| Host | `containers-us-west-123.railway.app` |
| Puerto | `6543` |
| Base de datos | `railway` |

---

```

5. Copiar el valor proporcionado por Railway.

El valor será similar a:

```text
mysql://usuario:contraseña@host:puerto/base_de_datos
```

### Importante

No publicar el valor real de:

```text
MYSQL_PUBLIC_URL
```

en GitHub.

Esta información puede contener credenciales de acceso a la base de datos.

---

# 10. Diferencia entre `MYSQL_URL` y `MYSQL_PUBLIC_URL`

Railway puede proporcionar diferentes cadenas de conexión.

Por ejemplo:

```text
MYSQL_URL
```

y:

```text
MYSQL_PUBLIC_URL
```

No deben confundirse.

Para una herramienta externa como **MySQL Workbench**, se debe utilizar la información de conexión pública proporcionada por Railway.

La razón es que Workbench está instalado en el equipo local y necesita acceder al servidor MySQL a través de una conexión accesible desde Internet.

En cambio, una conexión interna puede estar destinada a servicios que se encuentran dentro del entorno de Railway.

---


# 11. Crear una conexión de Railway en MySQL Workbench

Abrir MySQL Workbench.

En la pantalla principal seleccionar:

```text
MySQL Connections
```

y crear una nueva conexión.

Seleccionar:

```text
+
```

o:

```text
Add Connection
```

---

# 12. Configurar la conexión

Utilizar los valores obtenidos de `MYSQL_PUBLIC_URL`.

Por ejemplo, si la URL es:

```text
mysql://root:MiPassword@monorail.proxy.rlwy.net:12345/railway
```

la configuración será:

### Connection Name

Este nombre es solamente para identificar la conexión.

Por ejemplo:

```text
Railway - Control Escolar
```

### Hostname

```text
monorail.proxy.rlwy.net
```

### Port

```text
12345
```

### Username

```text
root
```

### Password

La contraseña se ingresa después al dar clic en Test Connection:

```text
MiPassword
```
Despues aparecera una ventana y se debe dar clic en Continue Anyway

# 13. ¿Por qué utilizar MySQL Workbench?

MySQL Workbench permite administrar visualmente y relacionar tablas de la base de datos que está alojada en Railway.

Por ejemplo:

```text
┌───────────────────────┐
│    MySQL Workbench    │
│       PC local        │
└───────────┬───────────┘
            │
            │ conexión pública
            ▼
┌───────────────────────┐
│       Railway         │
│       MySQL           │
└───────────────────────┘
```

La base de datos sigue estando en Railway.

Workbench solamente se conecta a ella para administrarla.

---


# 14. Seleccionar la base de datos

Para trabajar directamente con la base de datos:

```sql
USE NOMBRE_BASE_DATOS;
```

Railway te da una base de datos de nombre:

```text
railway
```

se debe ejecutar:

```sql
USE railway;
```


# 15. Ejecutar el archivo SQL

Ejecutar las tablas del script una por una ordenadamente como esta en el script para evitar conflictos.
Y después se ejecuta la informacion insertada 

Por ejemplo:

```text
CREATE TABLE ...
INSERT INTO ...
```

---

# 16. Verificar que las tablas fueron creadas

En MySQL Workbench ejecutar:

```sql
SHOW TABLES;
```

También se puede actualizar el panel de esquemas para visualizar las tablas.

Deben aparecer las tablas correspondientes al proyecto.

Por ejemplo:

```text
calumnos
casignaturas
ccarreras
cdatospersonales
cestados
chorarios
...
```


---

# 17. Datos necesarios para conectar Render con Railway

Una vez que la base de datos funciona correctamente, se necesitan los datos de conexión para que la aplicación Node.js pueda acceder a Railway.

Los datos necesarios son:

```env
DB_HOST=HOST_RAILWAY
DB_USER=USUARIO_RAILWAY
DB_PASSWORD=PASSWORD_RAILWAY
DB_NAME=DATABASE_RAILWAY
DB_PORT=PUERTO_RAILWAY
```

Estos valores deben corresponder a la conexión pública de Railway cuando Render se encuentra fuera del entorno de Railway.

---

# 18. Relación entre `MYSQL_PUBLIC_URL` y las variables `DB_*`

Por ejemplo, Railway podría proporcionar una URL ilustrativa:

```text
mysql://root:MiPassword@monorail.proxy.rlwy.net:12345/railway
```

De ella se obtiene:

```env
DB_HOST=monorail.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=MiPassword
DB_NAME=railway
DB_PORT=12345
```

Estas variables serán configuradas posteriormente en Render.

> Los valores anteriores son únicamente un ejemplo. Cada instancia de Railway tendrá sus propios valores.

---

# 19. Configurar las variables en Render

Cuando se configure el Web Service en Render, entrar a:

```text
Environment
```

y agregar:

```env
DB_HOST=HOST_PUBLICO_RAILWAY
DB_USER=USUARIO_RAILWAY
DB_PASSWORD=PASSWORD_RAILWAY
DB_NAME=DATABASE_RAILWAY
DB_PORT=PUERTO_RAILWAY

JWT_SECRET=TU_CLAVE_SECRETA
CURP_TOKEN=TU_TOKEN_CURP
```

La aplicación utilizará estas variables para conectarse a MySQL.

---

# 20. Comprobar `database/db.js`

Antes del despliegue, revisar que el archivo:

```text
database/db.js
```

utilice los mismos nombres de variables configurados en Render.

Por ejemplo:

```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
```

La implementación exacta puede variar dependiendo del código del proyecto.

Lo importante es que:

```text
Código
   │
   ├── process.env.DB_HOST
   ├── process.env.DB_USER
   ├── process.env.DB_PASSWORD
   ├── process.env.DB_NAME
   └── process.env.DB_PORT
          │
          ▼
       Railway
```

Los nombres deben coincidir exactamente.

---

# 21. No utilizar `localhost` en Render

Cuando la aplicación funciona localmente, es posible que `.env` tenga:

```env
DB_HOST=localhost
```

Esto funciona porque MySQL está instalado en el mismo equipo local.

Pero en producción:

```text
Render
```

y:

```text
Railway
```

son servicios separados.

Por lo tanto, **no utilizar**:

```env
DB_HOST=localhost
```

en Render.

Tampoco utilizar:

```env
DB_HOST=127.0.0.1
```

porque esos valores apuntarían al propio entorno de Render y no al servidor MySQL de Railway.

---

# 22. Seguridad de `MYSQL_PUBLIC_URL`

`MYSQL_PUBLIC_URL` debe tratarse como información sensible.

No publicar su valor real en:

* GitHub.
* README.
* `.env.example`.
* Capturas de pantalla públicas.
* Documentación pública.
* Mensajes o foros.

---

# 35. Flujo completo de Railway

Para una nueva instalación del proyecto, el procedimiento completo es:

```text
1. Crear cuenta en Railway
        ↓
2. Crear New Project
        ↓
3. Add Service
        ↓
4. Database
        ↓
5. MySQL
        ↓
6. Esperar a que MySQL esté activo
        ↓
7. Abrir MySQL
        ↓
8. Entrar a Variables
        ↓
9. Obtener MYSQL_PUBLIC_URL
        ↓
10. Identificar:
      ├── Host
      ├── Port
      ├── User
      ├── Password
      └── Database
        ↓
11. Abrir MySQL Workbench
        ↓
12. Crear nueva conexión
        ↓
13. Introducir Host + Port + User + Password
        ↓
14. Test Connection
        ↓
15. Abrir archivo SQL del proyecto
        ↓
16. Ejecutar SQL
        ↓
17. SHOW TABLES
        ↓
18. Comprobar datos
        ↓
19. Comprobar claves y relaciones
        ↓
20. Utilizar los datos de conexión
    para configurar Render
```

---

# 36. Verificación final de Railway

Antes de continuar con el despliegue de Render, comprobar:

```text
[✓] Cuenta de Railway creada
[✓] Proyecto Railway creado
[✓] Servicio MySQL creado
[✓] MySQL está funcionando
[✓] MYSQL_PUBLIC_URL obtenida
[✓] Host identificado
[✓] Puerto identificado
[✓] Usuario identificado
[✓] Contraseña identificada
[✓] Base de datos identificada
[✓] MySQL Workbench instalado
[✓] Conexión de Workbench creada
[✓] Test Connection exitoso
[✓] Archivo SQL importado
[✓] Tablas creadas
[✓] Registros verificados
[✓] Claves primarias verificadas
[✓] Claves foráneas verificadas
[✓] Relaciones verificadas
[✓] Datos preparados para configurar Render
```

Una vez completados estos pasos, la base de datos de Railway estará preparada para recibir conexiones desde la aplicación Node.js desplegada en Render.


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
4. Autorizar a Render para acceder al repositorio.
5. Seleccionar el repositorio del proyecto.

Render utilizará este repositorio como fuente de código para realizar el despliegue.
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
| DB_HOST | Host de la base de datos Railway |
| DB_USER | Usuario de Railway |
| DB_PASSWORD | Contraseña de Railway |
| DB_NAME | Nombre de la base de datos de Railway|
| DB_PORT | Puerto utilizado por Railway |
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
