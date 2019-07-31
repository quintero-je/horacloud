.1en general, el proyecto consiste en un Sistema de fichaje y control horario multi-empresa para 
trabajadores en las que puedan registrar el inicio y finalización de su trabajo simplemente 
introduciendo su numero de identificación en un formulario. El cursor deberá estar siempre en e
 formulario y al introducirse el número, tanto de forma manual como desde un lector de tarjetas,
 se enviará y procesará. Si el trabajador no se encontraba logueado, será un check-in, si estaba
 logueado, será un check-out. Se mostará en pantalla durante varios segundos las horas que 
 llevaba activo.

Adicionalmente, ha de disponer de un área privada en la que existan los siguientes perfiles:
1. Superusuario
    - Crear/editar/eliminar empresas
    - Crear/editar/eliminar usuarios administrativos empresas
    - listar empresas y trabajadores registrados, volumen de informes generados
    - Generar copia seguridad/exportación empresa

2. Empresa
    - Gerencia
    - Responsable recursos humanos

3. Trabajador

La empresa deberá poder dar de alta trabajadores y asignarles un número de identificación,
 agrupar los trabajadores por grupos y asignarles turnos de trabajo en un calendario de forma
  dinámica (tipo google calendar). Se podrán definir por trabajador las siguientes 
  circunstancias:
- Trabajo
- Vacaciones
- Días propios
- Baja laboral
- Ausencia no justificada
- Horas extraordinarias
Existirá una vista que permitirá generar informes conjuntos de asistencia e individualizados.


El trabajador a su vez podrá visualizar el calendario y añadir, pendiente de validación
 por la empresa, las siguientes circunstancias:
- Vacaciones
- Días propios
- Baja laboral
- Justificar Ausencia no justificada
- Horas extraordinarias
Existirá una vista que permitirá generar informes de asistencia y horas trabajadas, 
inluyendo horas extraordinarias de forma individualizada.

_________________________________________________________________________________________

La pantalla de check debe estar en el raíz / de forma que sea lo que se visualize al entrar en la URL. El dominio definitivo del proyecto será https://hora.cloud (para el desarrollo será dev.hora.cloud

Title: Hora Cloud | Control horario inteligente

Cambiar placeholder por: Introduzca su identificador
Cambiar texto del button "Confirmar" por: Fichar

Detectar si se han introducido valores en el campo y hacer automáticamente el POST

Quitar referencias a http://demo.smarttimesheet.site y cargar de local los objetos.

Si se introduce un código incorrecto, devolver un código de error de apache 403 (forbiden) de forma que quede registrado en el log del servidor el intento fallido. Al tercer intento desde la misma IP, devolver una página de error en la que se indique que contacte con soporte:
Ha introducido un código erróneo en tres ocasiones. Su acceso ha quedado bloqueado. Por favor, contacte con soporte.
En cada check guardar IP de origen de la petición

Colocar un footer al pié de la página, centrado, con el siguiente texto:

Área de usuario | Nota legal | Contactar
(c) 2019 Hora Cloud - Control horario inteligente

Los enlaces serían los que siguen:
Área de usuario: /login (login al panel)
Legal: https://www.occentus.net/legal/
Contactar: https://www.occentus.net/contactar/


____________________________________________________________________________________

/empleados/IDEMPLEADO/editar

Los campos de la ficha del trabajador son los que siguen:

Nombre (opcional)
Apellido 1 (opcional)
Apellido 2 (opcional)
Identificador (IDEMPLEADO, identificador de empleado interno que utilice la empresa, obligatorio)
Código de identificación (número hexadecimal que empleamos para fichar)
Correo-e (opcional)
Teléfono (opcional)
Teléfono móvil (opcional)
Contraseña
Grupos a los que esté adscrito (tipo tags)

Retirar las casillas de verificación en los campos a editar. Al pulsar aceptar, pedir una doble validación, que incluya una casilla y el siguiente texto:

Advertencia: Verifique los datos introducidos y valide la edición de los campos.

____________________________________________________________________________________


/empleados
Añadir las opciones secundarias en un menú interno de la sección, colocando los botones, 
de forma horizontal a la derecha del título. Las opciones serán:
Nuevo empleado | Justificaciones

En la lista de acciones diferenciar calendario de tabla. Donde Turnos es una vista en 
tabla de los turnos por semana, Calendario mostraría su calendario individual con los
 turnos y eventos registrados, Registro sería la lista de registros del empleado. 
 Informe un informe de las horas trabajadas. Las acciones serían:

Turnos | Calendario | Registro | Informe | Editar | Eliminar

/empleados/IDEMPLEADO/registos

donde IDEMPLEADO corresponde al identificador de empleado dentro de la empresa.

Añadir la opción de editar el registro durante los 7 días siguientes a su generación. Una vez transcurridos los 7 dias debe ser no editable. Pues se generará el informe de horas trabajadas y será enviado al trabajador.

Permitir filtrar/ordenar y añadir paginación a la lista.

/empleados/IDEMPLEADO/turnos/editar

Mostrar una lista anual en la que aparezcan todos los días, y organizada verticalmente por semanas. Existirá un un seleccionable enl el campo semana y en todos los días de esa semana que contenga los diferentes turnos (Por ejemplo: Mañana, tarde, noche, central, ...). Si seleccionamos el de la semana, se marcarán con el mismo turno los demás dias, si bien estos podrán ser posteriormente cambiados.

/empleados/IDEMPLEADO/turnos

Informe semanal de control Horario

Lista de los informes semanales generados con el trabajador.
El informe incluirá las horas efectivas trabajadas así como las horas extraordinarias realizadas. Estos datos se calcularán con la suma de horas trabajadas en la semana y en base a las horas previstas que el trabajador debía realizar en base a sus turnos. Los datos serán aquellos datos ya consolidados (registros de más de 7 días de antigüedad y que ya no pueden ser modificados.)
El informe se podrá descargar en PDF. El PDF incluirá la plantilla o imágenes de cabecera y pié que se definan en la configuración.

/empleados/IDEMPLEADO/calendario

Calendario de turnos del empleado
Mostrar un calendario visual en el que se relacionen los turnos de trabajo. Este calendario debería permitir la edición y mover los turnos de trabajo.

/informes
Una nueva categoría raíz llamada informes, en la que se podrán generar informes y listarán los informes semanales emitidos a los trabajadores en las que se relacionan las horas trabajadas tanto las regulares como horas extraordinarias.
Lista de los informes semanales generados con el trabajador.

El informe incluirá las horas efectivas trabajadas así como las horas extraordinarias realizadas. Estos datos se calcularán con la suma de horas trabajadas en la semana y en base a las horas previstas que el trabajador debía realizar en base a sus turnos. Los datos serán aquellos datos ya consolidados. Estos son los registros de más de 7 días de antigüedad y que ya no pueden ser modificados.

El informe se podrá descargar en PDF. El PDF incluirá la plantilla o imágenes de cabecera y pié que se definan en la configuración.

Los informes personalizados de cada trabajador estarán en la siguiente ruta:

/empleados/IDEMPLEADO/informes




______________________________________________________________________________________

Configuración es una nueva página en la que se podrá
1. Configurar la empresa (nombre, razón social, logotipo, plantilla para los informes)
2. Generar el token de la api
3. Crear o administrar los usuarios administrativos.
4. Definir dias festivos
5. Exportar los datos de los trabajadores en Excel

El token se generará y listará desde las opciones de configuración de la empresa incluyendo un campo de descripción para cada token generado, que servirán para autenticar el origen de la petición automática.

_____________________________________________________________________________________


Dashboard
Empleados
Grupos
Turnos
Informes
Configuración

Las opciones secundarias, tipo nuevo empleado nuevo grupo, justificaciones, irán dentro de la opción raíz.

Por ejemplo, nuevo empleado y justificaciones irán a la derecha del título de empleados. Nuevo grupo irá a la derecha del título de grupo.

Informes será una nueva categoría, en la que se podrán generar informes y listarán los informes semanales emitidos.

Configuración será una nueva página en la que se podrá configurar la empresa (nombre, razón social, logotipo, plantilla para los informes, etc)
generar el token de la api y crear o administrar los usuarios administrativos.

Las peticiones pendientes se ubicarán en el la barra superior, en la que junto al icono del usuario se mostrará una entrada de menú "Solicitudes" y un número con las solicitudes pendientes que existan.

_____________________________________________________________________________________________

/turnos
A modo de ejemplo, adjunto un ejemplo real de una vista de calendario de turnos desde un excel.

La vista de turnos /turnos debe mostrar un calendario a pantalla completa y ajustable. La vista tabla mostrará una tabla parecida al excel adjuntado. Esta vista será el resultado de haber definido los diferentes turnos a los trabajadores, de forma individualizada o por grupos.

Añadir un turno permitirá añadir tipos de turno semanales (por ejemplo mañana, tarde, central, noche). Se podrá dar nombre al turno y se mostrarán 7 columnas por cada día de la semana y dentro de ellas se podrán añadir horas de inicio y finalización, que pueden ser varios, por ejemplo si un turno es partido y paran varias horas para comer.
Esto anterior preferiblemente se definiría de forma gráfica sobre la vista semanal de un calendario editable.

_______________________________________________________________________________________________

Los grupos están pensados para agrupar tipos de empleados. por ejemplo programadores, personal de limpieza, seguridad, etc

_________________________________________________________________________________________________

Permitir el checkin o checkout mediante una llamada directa en la que se envíe el código, tipo:

https://hora.cloud/api?codigo=VLJRFKECMPB1RLEM5WL79851U&token=m97n3WGINq2vyLoIPyWRHULGw
Se registrará la IP de origen
el token se generará y listará desde las opciones de configuración de la empresa incluyendo un campo de descripción para cada token generado, que servirán para autenticar el origen de la petición automática.

