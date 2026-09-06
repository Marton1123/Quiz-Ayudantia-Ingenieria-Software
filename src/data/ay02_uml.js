export const ay02Uml = {
  id: "ay02",
  code: "AYUDANTIA2",
  number: 2,
  title: "Taller de Modelamiento UML",
  subtitle: "Casos de Uso, Clases, Actividad y Secuencia",
  course: "Ingenieria de Software",
  semester: "2026-02",
  description: "Evaluacion formativa e interactiva sobre fundamentos teoricos, simbologia estandar y aplicacion practica de diagramas UML en proyectos de software.",
  defaultTimerSeconds: 30,
  pointsPerQuestion: 1000,
  questions: [
    {
      id: 1,
      topic: "Casos de Uso",
      q: "Cual es la caracteristica definitoria de una relacion «include» entre dos casos de uso en UML?",
      opts: [
        "El caso de uso base se ejecuta siempre e incorpora de forma obligatoria el comportamiento del caso incluido.",
        "El caso de uso incluido solo se ejecuta si se cumple una condicion excepcional de error en tiempo de ejecucion.",
        "Representa una jerarquia de herencia donde el caso hijo especializa el comportamiento del padre.",
        "Indica que ambos casos de uso se ejecutan de manera concurrente en hilos de ejecucion independientes."
      ],
      ans: 0,
      exp: "La relacion «include» es incondicional y obligatoria: el caso de uso base no puede completarse sin ejecutar el caso incluido (ejemplo: Crear Reserva incluye obligatoriamente Validar Disponibilidad)."
    },
    {
      id: 2,
      topic: "Casos de Uso",
      q: "En un diagrama de casos de uso, cuando es metodologicamente correcto emplear una relacion «extend»?",
      opts: [
        "Para modelar un subproceso obligatorio que siempre forma parte del camino feliz.",
        "Para modelar un comportamiento opcional o condicional que extiende al caso base solo bajo una condicion de extension especifica.",
        "Para vincular dos actores que comparten los mismos privilegios de acceso en el sistema.",
        "Para conectar una clase de control con su interfaz grafica de usuario correspondiente."
      ],
      ans: 1,
      exp: "La relacion «extend» agrega comportamiento opcional, alternativo o condicional a un caso de uso base en puntos de extension definidos (ejemplo: Aplicar Cupon de Descuento extiende Pagar Reserva)."
    },
    {
      id: 3,
      topic: "Casos de Uso",
      q: "Cual de las siguientes afirmaciones respecto a los Actores en UML es conceptualmente correcta?",
      opts: [
        "Un actor representa exclusivamente a personas fisicas sentadas frente a la estacion de trabajo.",
        "Los actores forman parte interna del limite del sistema (System Boundary).",
        "Un actor modela un rol externo que interactua con el sistema, pudiendo ser un usuario humano o un sistema de software externo.",
        "Los actores deben comunicarse entre si mediante flechas directas de asociacion dentro del diagrama."
      ],
      ans: 2,
      exp: "Un actor modela cualquier entidad externa al limite del sistema (humana o automatizada, como una pasarela bancaria o un servicio de correos) que intercambia informacion con los casos de uso."
    },
    {
      id: 4,
      topic: "Casos de Uso",
      q: "Al documentar la especificacion textual de un caso de uso, que representa el 'camino feliz' (Happy Path)?",
      opts: [
        "La lista exhaustiva de excepciones de red y recuperacion ante fallas de hardware.",
        "El flujo basico principal donde todos los pasos se ejecutan con exito sin desvios ni errores.",
        "El diagrama de clases que genera el codigo fuente del modulo correspondiente.",
        "La prueba de estres que determina la capacidad maxima de usuarios concurrentes."
      ],
      ans: 1,
      exp: "El flujo basico o 'camino feliz' describe la secuencia ideal de pasos secuenciales en la que no se producen errores ni bifurcaciones excepcionales."
    },
    {
      id: 5,
      topic: "Diagrama de Clases",
      q: "Cual es la diferencia fundamental entre una relacion de Composicion (rombo negro) y una de Agregacion (rombo blanco)?",
      opts: [
        "La composicion permite que el objeto parte sobreviva libremente a la destruccion del objeto contenedor.",
        "La composicion implica pertenencia fuerte y ciclo de vida dependiente: si el 'todo' se destruye, las 'partes' se destruyen con el.",
        "La agregacion se representa con linea discontinua y carece de especificaciones de multiplicidad.",
        "La agregacion solo vincula clases de la capa de datos con controladores de servicio."
      ],
      ans: 1,
      exp: "En la Composicion (rombo relleno) el ciclo de vida de la parte esta fuertemente acoplado al todo (ejemplo: Factura e Items). En la Agregacion (rombo vacio) la parte puede existir independientemente del todo (ejemplo: Universidad y Estudiante)."
    },
    {
      id: 6,
      topic: "Diagrama de Clases",
      q: "Como se representa formalmente la relacion de Generalizacion (Herencia) en un Diagrama de Clases UML estandar?",
      opts: [
        "Linea solida con flecha rellena abierta hacia la subclase especializada.",
        "Linea discontinua terminada en un rombo transparente en su extremo superior.",
        "Linea solida con un triangulo cerrado hueco (sin relleno) que apunta hacia la superclase (padre).",
        "Linea curva bidireccional con flechas en ambos extremos."
      ],
      ans: 2,
      exp: "En la notacion formal UML, la generalizacion se representa con una linea continua que remata en un triangulo cerrado blanco (hueco) apuntando directamente a la clase general o superclase."
    },
    {
      id: 7,
      topic: "Diagrama de Clases",
      q: "En la especificacion de atributos y metodos de una clase UML, que denotan los simbolos '+', '-' y '#'?",
      opts: [
        "'+' Publico, '-' Privado, '#' Protegido (accesible por la clase y sus derivadas).",
        "'+' Positivo, '-' Negativo, '#' Constante estatica de clase.",
        "'+' Metodo estatico, '-' Metodo abstracto, '#' Metodo final no sobreescribible.",
        "'+' Operacion sincrona, '-' Operacion asincrona, '#' Elemento deprecado."
      ],
      ans: 0,
      exp: "Los estandares de visibilidad en UML establecen: '+' Public (acceso total), '-' Private (solo visible dentro de la clase) y '#' Protected (visible para la clase y sus subclases)."
    },
    {
      id: 8,
      topic: "Diagrama de Clases",
      q: "Si en una asociacion entre 'Usuario' y 'Reserva' el extremo de Reserva indica multiplicidad '0..*', como debe interpretarse?",
      opts: [
        "Un usuario debe poseer exactamente una reserva obligatoria activa en el sistema.",
        "Un usuario puede no tener reservas registradas o tener multiples reservas asociadas.",
        "Todas las reservas registradas pertenecen obligatoriamente a cero usuarios simultaneos.",
        "El sistema restringe a un maximo estricto de diez reservas por usuario."
      ],
      ans: 1,
      exp: "'0..*' senala una cota inferior de cero (relacion opcional, por ejemplo un usuario recien registrado) y una cota superior de muchos (sin limite prefijado)."
    },
    {
      id: 9,
      topic: "Diagrama de Actividad",
      q: "Cual es el proposito fundamental de los carriles o Swimlanes en un Diagrama de Actividad UML?",
      opts: [
        "Modelar las claves primarias y relaciones foraneas del motor de base de datos.",
        "Separar y delimitar claramente que actor, sistema o capa arquitectonica es responsable de ejecutar cada actividad.",
        "Estimar el tiempo exacto en milisegundos que toma el procesamiento de cada rutina.",
        "Sustituir a los diagramas de clases cuando el sistema no utiliza programacion orientada a objetos."
      ],
      ans: 1,
      exp: "Los swimlanes organizan visualmente las actividades asignando la responsabilidad de cada accion a un rol o subsistema especifico (ejemplo: carril Estudiante frente a carril Sistema)."
    },
    {
      id: 10,
      topic: "Diagrama de Actividad",
      q: "Que regla formal deben cumplir las ramas que divergen desde un nodo de decision (rombo) en un diagrama de actividad?",
      opts: [
        "Deben ejecutarse en paralelo de forma obligatoria mediante hilos independientes.",
        "Deben poseer guardas textuales entre corchetes [condicion] que sean mutuamente excluyentes.",
        "Deben converger directamente en el nodo de inicio sin transitar por actividades intermedias.",
        "Solo pueden conectarse con clases abstractas mediante dependencias punteadas."
      ],
      ans: 1,
      exp: "Un nodo de decision evalua condiciones booleanas disyuntas denominadas guardas (ejemplo: [Si] y [No]); una sola transicion puede activarse segun el resultado de la evaluacion."
    },
    {
      id: 11,
      topic: "Diagrama de Actividad",
      q: "Cual es la diferencia conceptual entre un rombo de decision y una barra de concurrencia (Fork) en un diagrama de actividad?",
      opts: [
        "El rombo bifurca hacia un unico camino excluyente segun su guarda; la barra Fork inicia multiples flujos que se ejecutan concurrentemente.",
        "El rombo solo se permite al inicio del flujo y la barra Fork unicamente al cierre del diagrama.",
        "No existe diferencia; en la especificacion UML 2.5 ambos simbolos son semanticamente identicos.",
        "La barra de concurrencia solo se utiliza para gestionar excepciones de conexion de red."
      ],
      ans: 0,
      exp: "El rombo (Decision) representa logica condicional disyuntiva ('O'). La barra Fork representa paralelismo concurrente ('Y'), activando simultaneamente todos los flujos salientes."
    },
    {
      id: 12,
      topic: "Diagrama de Secuencia",
      q: "Como se distingue visualmente un mensaje sincrono de un mensaje de retorno en un Diagrama de Secuencia?",
      opts: [
        "Mensaje sincrono: flecha discontinua abierta; mensaje de retorno: linea continua con doble punta.",
        "Mensaje sincrono: linea solida con punta de flecha rellena; mensaje de retorno: linea discontinua con punta abierta.",
        "Ambos mensajes se grafican mediante lineas continuas carentes de flechas direccionales.",
        "El mensaje de retorno se dibuja en sentido vertical a lo largo del tiempo de la linea de vida."
      ],
      ans: 1,
      exp: "Una llamada sincrona bloqueante se representa con una linea continua y punta triangular solida (->). La respuesta con datos o confirmacion de retorno se representa con linea discontinua y punta abierta (- - ->)."
    },
    {
      id: 13,
      topic: "Diagrama de Secuencia",
      q: "Que denota la presencia de una Barra de Activacion (rectangulo vertical) sobre una linea de vida en un Diagrama de Secuencia?",
      opts: [
        "Que el componente o instancia ha sido recolectado por el Garbage Collector de la maquina virtual.",
        "El intervalo de tiempo durante el cual la instancia retiene el control de ejecucion o ejecuta activamente un metodo.",
        "Que el participante corresponde necesariamente a un actor humano y no a un servicio de software.",
        "El conteo de sentencias SQL que el componente envia al gestor relacional."
      ],
      ans: 1,
      exp: "La barra de activacion (Execution Specification) ilustra el lapso temporal durante el cual el objeto se encuentra ejecutando codigo o esperando que un llamado sincrono subordinado finalice."
    },
    {
      id: 14,
      topic: "Diagrama de Secuencia",
      q: "En una arquitectura desacoplada por capas modelada en secuencia, cual es el flujo de delegacion correcto para registrar una entidad?",
      opts: [
        "El Actor invoca directamente a la Base de Datos, y la Base de Datos refresca la Interfaz de Usuario.",
        "La Base de Datos invoca a la Interfaz, la cual instancia las reglas de negocio en el Repositorio.",
        "El Actor interactua con la Interfaz (:UI), la Interfaz delega la logica en el Servicio (:Service), y el Servicio persiste la entidad en el Repositorio (:Database).",
        "El Servicio de negocio solicita autorizacion al Actor antes de atender los eventos provenientes de la Interfaz."
      ],
      ans: 2,
      exp: "El patron arquitectonico por capas prohibe el salto directo de presentacion a persistencia: la capa UI delega en el Service (logica de negocio), y el Service interactua con la capa de datos (Database)."
    },
    {
      id: 15,
      topic: "Encuentra el Error UML",
      q: "Analiza el siguiente caso: Un diagrama de actividad ubica la tarea 'Verificar disponibilidad en base de datos' dentro del carril del 'Estudiante'. Cual es el error?",
      diagramSnippet: "Carril [Estudiante]:\n  [Seleccionar Fecha y Hora] --> [Verificar disponibilidad en BD] (?)",
      opts: [
        "No existe error; el estudiante inicio el proceso, por ende le pertenecen todas las tareas derivadas.",
        "Error de asignacion de responsabilidad: consultar la base de datos es una operacion interna del Sistema; debe situarse en el carril [Sistema].",
        "Error de nomenclatura: los nombres de actividades deben contener maximo tres palabras tecnicas.",
        "Error sintactico: no es posible conectar dos actividades consecutivas dentro del mismo carril."
      ],
      ans: 1,
      exp: "Un estudiante humano no consulta bases de datos directamente; interactua seleccionando criterios en la interfaz, y es el Sistema en su propio carril el responsable de verificar la disponibilidad."
    },
    {
      id: 16,
      topic: "Encuentra el Error UML",
      q: "En un diagrama de casos de uso se modelo: '[Realizar Reserva] ---«extend»---> [Validar Identidad del Usuario]'. Sabiendo que la validacion es obligatoria para todos los usuarios, cual es la inconsistencia?",
      diagramSnippet: "[Realizar Reserva] ----«extend»----> [Validar Identidad]",
      opts: [
        "No hay inconsistencia; «extend» se emplea obligatoriamente para operaciones de alta seguridad.",
        "Inconsistencia de estereotipo: al ser una accion obligatoria e indispensable para completar la reserva, la relacion correcta es «include» desde el caso base al incluido.",
        "Inconsistencia estructural: la validacion de identidad no puede modelarse como un caso de uso independiente.",
        "Inconsistencia direccional: las relaciones «extend» solo pueden apuntar hacia actores secundarios."
      ],
      ans: 1,
      exp: "«extend» modela extensiones condicionales u optativas. Si la validacion es un prerrequisito obligatorio para que la reserva se consume, debe usarse «include» con la flecha dirigida hacia Validar Identidad."
    }
  ]
};
