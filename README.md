# Horacloud

_Sistema de fichaje y control horario multi-empresa para trabajadores capaz de registrar el inicio y final de la jornada laboral diaria, con una interfaz simple e intuitiva para permitir al usuario el registro de manera sencilla y con un mínimo de pasos a seguir._

## Comenzemos 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_EL entorno necesario para la puesta en marcha de esta plataforma es el siguiente:_

´´´
Nodejs >= v10.14.2

MongoDB >= v3.6.4
´´´

## Deployment 📦

Para despliegue en modo desarrollo, debe Modificar el archivo database.js en la línea 3 a partir del caracter Col 35, la URI que se encuentra entre comillas y sustituirla por la direccion de conexión de su servidor de base de datos:

```
var db = process.env.MONGOURI || 'mongodb://localhost/horacloud-db';
```
_Y luego ejecutar el sigueinte comando:_

```
npm run dev 
```
Para despliegue en modo producción Crear Variable de entorno MONGOURI="Dirección_URI_del_servidor_de_base_de_datos_MongoDb" y el comando:

```
npm start
```


## Construido con 🛠️

_Esta plataforma utiliza las siguientes tecnologías, para mayor detalle por favor consulte la documentación de cada dependencia:_


* [Nodejs](https://nodejs.org/es/docs/) - Entorno de ejecución
* [Express](https://expressjs.com/es/4x/api.html) - Framework para nodejs
* [Mongodb](https://docs.mongodb.com/) - Manejador de Base de Datos
* [Mongoose](https://mongoosejs.com/docs/guide.html) - Modelador de Objetos para Base de Datos
* [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/) - Framework para Maquetado
* [MDBootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/) - Framework de diseño tipo Material Design
* [Full Calendar](https://fullcalendar.io/docs) - Plugin para Calendario
* [Handlebars](https://handlebarsjs.com/) - Motor de plantillas


## Autor ✒️


* **José Eduardo Quintero** - *Desarrollo Full Stack* - [quintero-je](https://github.com/quintero-je)

## Licencia 📄

Este proyecto está bajo Licencia (Privativa).



---
⌨️  [quintero.je@gmail.com](mailto:quintero.je@gmail.com) 😊
