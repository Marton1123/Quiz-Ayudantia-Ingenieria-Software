export const ay04RepasoP1 = {
  "id": "ay04",
  "code": "AYUDANTIA4",
  "altCodes": [
    "AY04-REPASO",
    "REPASO-P1",
    "P1"
  ],
  "number": 4,
  "title": "Ayudantía N°4: Repaso Estratégico P1",
  "subtitle": "Repaso General P1: V/F Conceptual, INVEST, BDD, Tableros Kanban, Secuencia UML y Patrón Strategy",
  "course": "Ingeniería de Software",
  "semester": "2026-02",
  "cardImage": "/assets/ay04_repaso_p1.png",
  "description": "Entrenamiento interactivo: justificación técnica de V/F, historias INVEST, escenarios BDD, límites WIP en Kanban, casos de uso con excepción, diagramas de secuencia UML y patrón de diseño Strategy.",
  "defaultTimerSeconds": 60,
  "pointsPerQuestion": 1000,
  "questions": [
    {
      "id": 1,
      "topic": "Parte 1: V/F - Acoplamiento e Interfaces",
      "q": "«Una clase puede usar interfaces en sus atributos y, aun así, seguir fuertemente acoplada a implementaciones concretas.» ¿Es esto verdadero o falso y por qué?",
      "opts": [
        "FALSO: Declarar un atributo con una interfaz garantiza desacoplamiento total al compilar y al ejecutar.",
        "VERDADERO: Si la clase crea la instancia con \"new\" dentro de su constructor, queda acoplada al compilar.",
        "FALSO: El acoplamiento solo ocurre si se usan métodos estáticos o variables globales.",
        "VERDADERO: Las interfaces siempre crean acoplamiento obligatorio sin importar cómo se instancien."
      ],
      "ans": 1,
      "exp": "VERDADERO. Aunque el atributo sea de tipo interfaz, si el constructor hace \"new ClaseConcreta()\", la clase queda acoplada rígidamente a esa implementación. La solución para desacoplar es la Inyección de Dependencias."
    },
    {
      "id": 2,
      "topic": "Parte 1: V/F - Compilación vs Ejecución",
      "q": "Al instanciar una clase concreta con \"new\" dentro de una clase que usa interfaces, ¿cuál es la diferencia entre tiempo de compilación y ejecución?",
      "opts": [
        "La interfaz permite polimorfismo al ejecutar, pero el operador \"new\" crea acoplamiento fijo al compilar.",
        "El operador \"new\" optimiza memoria al compilar, mientras que la interfaz reduce demoras al ejecutar.",
        "La interfaz solo se resuelve al compilar y el operador \"new\" se valida al poner en marcha el sistema.",
        "No hay diferencia; ambos operan únicamente al momento de ejecutar la aplicación."
      ],
      "ans": 0,
      "exp": "La interfaz entrega flexibilidad y polimorfismo dinámico en tiempo de ejecución, pero si usamos \"new\" en el constructor, quedamos atados a esa clase fija desde la compilación."
    },
    {
      "id": 3,
      "topic": "Parte 1: V/F - Herencia vs Composición",
      "q": "«Si una solución con herencia compila y no duplica código, siempre es mejor que usar composición.» ¿Es esto verdadero o falso?",
      "opts": [
        "VERDADERO: La herencia siempre es superior porque maximiza la reutilización de código de forma nativa.",
        "VERDADERO: No duplicar código es la única meta del diseño y la composición agrega complejidad innecesaria.",
        "FALSO: Que compile no garantiza buen diseño; la herencia acopla fuertemente y es mejor favorecer la composición.",
        "FALSO: La herencia solo está permitida entre interfaces, nunca entre clases."
      ],
      "ans": 2,
      "exp": "FALSO. Que compile y reutilice código no asegura buen diseño. La herencia crea un vínculo rígido y expone detalles internos. Por eso el principio de diseño recomienda favorecer la composición sobre la herencia."
    },
    {
      "id": 4,
      "topic": "Parte 1: V/F - Caja Blanca y Composición",
      "q": "¿Por qué en la presentación se describe a la herencia como «reutilización de caja blanca» frente a la composición?",
      "opts": [
        "Porque exige que todos los atributos de la clase padre sean públicos.",
        "Porque la clase hija conoce y depende de la estructura interna de la clase padre, perdiendo flexibilidad.",
        "Porque los compiladores eliminan los métodos privados de la clase padre al compilar.",
        "Porque obliga a realizar únicamente pruebas de caja blanca en el código fuente."
      ],
      "ans": 1,
      "exp": "Es de \"caja blanca\" porque la clase hija queda atada a cómo está construida la clase padre por dentro. En cambio, la composición es de \"caja negra\" porque solo interactúa mediante contratos o interfaces públicas."
    },
    {
      "id": 5,
      "topic": "Parte 1: V/F - Requisitos No Funcionales",
      "q": "«Un requisito no funcional bien especificado debe poder verificarse de forma objetiva.» ¿Es esto verdadero o falso?",
      "opts": [
        "FALSO: Los requisitos no funcionales son siempre apreciaciones subjetivas de cada usuario.",
        "VERDADERO: Sin métricas claras ni condiciones de prueba (pasa o no pasa), el requisito resulta ambiguo.",
        "FALSO: Solo los requisitos funcionales se verifican; los no funcionales son solo aspiraciones generales.",
        "VERDADERO: Pero únicamente cuando el requisito especifica costos monetarios o de infraestructura."
      ],
      "ans": 1,
      "exp": "VERDADERO. Un requisito no funcional sin una métrica verificable es solo una expresión de deseos. Debe tener un criterio objetivo y medible (pasa o no pasa)."
    },
    {
      "id": 6,
      "topic": "Parte 1: V/F - Métricas en Requisitos",
      "q": "¿Cuál de las siguientes opciones transforma un requisito no funcional ambiguo en uno verificable y medible?",
      "opts": [
        "Ambiguo: \"El sistema debe ser seguro\" → Verificable: \"El sistema no debe tener errores conocidos por los usuarios.\"",
        "Ambiguo: \"Alta disponibilidad\" → Verificable: \"El sistema debe estar en línea casi todo el tiempo los días hábiles.\"",
        "Ambiguo: \"El sistema debe ser rápido\" → Verificable: \"Tiempo de respuesta < 200 ms en el 95% de las solicitudes con 500 usuarios.\"",
        "Ambiguo: \"Fácil de usar\" → Verificable: \"La interfaz debe verse bonita e intuitiva para los usuarios nuevos.\""
      ],
      "ans": 2,
      "exp": "Para ser verificable debe contener números y condiciones medibles (por ejemplo: menor a 200 ms bajo 500 usuarios en horas punta), evitando adjetivos vagos como \"rápido\" o \"fácil\"."
    },
    {
      "id": 7,
      "topic": "Parte 2: Requisitos - Clasificación",
      "q": "En el caso Salas de Estudio: R1 (\"Fácil de usar\"), R2 (\"Reservar salas\"), R3 (\"Responder rápido\"), R4 (\"Impedir reservas inválidas\") y R5 (\"Ver ocupación\"). ¿Cómo se clasifican?",
      "opts": [
        "R1: No Funcional, R2: Funcional, R3: No Funcional, R4: Funcional, R5: No Funcional.",
        "R1: Ambiguo, R2: Funcional, R3: Ambiguo, R4: Regla Oculta / Ambiguo, R5: Funcional.",
        "R1: Funcional, R2: Funcional, R3: Funcional, R4: No Funcional, R5: Ambiguo.",
        "R1: Ambiguo, R2: No Funcional, R3: No Funcional, R4: Regla Oculta, R5: No Funcional."
      ],
      "ans": 1,
      "exp": "R1 y R3 son ambiguos por no tener métricas; R2 y R5 son funciones operativas del sistema (funcionales); y R4 es ambiguo / regla oculta porque no define qué hace inválida la reserva."
    },
    {
      "id": 8,
      "topic": "Parte 2: Requisitos - Criterio INVEST",
      "q": "¿Por qué el requisito \"Impedir reservas inválidas\" no cumple con ser verificable (criterio Testable en INVEST) y cómo se soluciona?",
      "opts": [
        "Porque usa la palabra \"sistema\"; se soluciona cambiando el sujeto por \"Como base de datos quiero validar...\".",
        "Porque no explica qué hace inválida una reserva; se soluciona definiendo la regla (ejemplo: solapamiento horario) y su rechazo comprobable.",
        "Porque evitar errores no es un requisito válido en metodologías ágiles.",
        "Porque tiene más de 3 palabras; se soluciona acortando la frase a una sola acción."
      ],
      "ans": 1,
      "exp": "Para poder probarlo objetivamente, se debe explicitar la regla de negocio concreta (por ejemplo: rechazar solicitudes con cruce de horario en la misma sala)."
    },
    {
      "id": 9,
      "topic": "Parte 2: Requisitos - Escenarios BDD",
      "q": "¿Cuál es el mejor escenario Dado / Cuando / Entonces (BDD) para probar el rechazo de reservas con tope de horario?",
      "opts": [
        "Dado: Que el sistema está lento. Cuando: Un usuario pide una sala. Entonces: El sistema muestra un mensaje de advertencia.",
        "Dado: La Sala 101 reservada hoy de 10:00 a 11:30. Cuando: Se pide la Sala 101 de 10:30 a 12:00. Entonces: Se rechaza la solicitud, no se guarda en BD y se avisa el tope.",
        "Dado: Una sala ocupada. Cuando: Alguien intenta reservarla a la misma hora. Entonces: La base de datos cancela la operación.",
        "Dado: Un usuario en la página. Cuando: Aprieta el botón de reservar dos veces. Entonces: El sistema ignora el segundo clic."
      ],
      "ans": 1,
      "exp": "Un escenario BDD claro debe usar datos precisos (Sala 101, horario de 10:00 a 11:30 vs 10:30 a 12:00), una acción concreta y un resultado verificable sin persistir datos erróneos."
    },
    {
      "id": 10,
      "topic": "Parte 3: Kanban - Trabajo en Curso (WIP)",
      "q": "En un tablero Kanban con columnas: Análisis (límite WIP: 2, tareas: 2), Desarrollo (límite WIP: 2, tareas: 3) y Pruebas (límite WIP: 3, tareas: 2). ¿Qué es WIP y qué columna incumple?",
      "opts": [
        "WIP es \"Work In Production\"; la columna que incumple es Pruebas.",
        "WIP es \"Work In Progress\" (trabajo en curso); la columna que excede su límite es Desarrollo (3 tareas > límite 2).",
        "WIP es \"Wait In Pipeline\"; la columna que incumple es Análisis porque tiene 2 tareas.",
        "WIP es \"Workflow Inspection\"; ninguna columna incumple porque los límites son sugerencias."
      ],
      "ans": 1,
      "exp": "WIP significa \"Work In Progress\" (trabajo iniciado pero no terminado). En este caso, Desarrollo tiene 3 tareas en curso superando su límite máximo fijado de 2."
    },
    {
      "id": 11,
      "topic": "Parte 3: Kanban - Cuello de Botella y Lead Time",
      "q": "¿Qué problema operativo produce en el equipo de trabajo superar el límite WIP en la columna Desarrollo?",
      "opts": [
        "Genera un cuello de botella, aumenta la multitarea y alarga el tiempo total de entrega (Lead Time).",
        "Acelera las entregas del equipo porque los desarrolladores avanzan más tareas en paralelo.",
        "Provoca que la columna Pruebas se sature automáticamente con trabajo terminado.",
        "Obliga a cancelar el proyecto completo y devolver todas las tareas al inicio."
      ],
      "ans": 0,
      "exp": "Tener más trabajo en curso del debido satura al equipo con cambios de contexto continuos, crea un cuello de botella y aumenta el tiempo total que demora una tarea en salir terminada."
    },
    {
      "id": 12,
      "topic": "Parte 3: Kanban - Gestión de Congestión WIP",
      "q": "«Si una columna supera seguido su límite WIP, subir el límite es siempre la mejor solución.» ¿Es esto verdadero o falso y qué se debe hacer?",
      "opts": [
        "VERDADERO: Subir el límite alivia la presión del equipo y permite seguir tomando tareas sin pausas.",
        "FALSO: Subir el límite solo esconde el problema; lo correcto es detener nuevos ingresos y colaborar en equipo para terminar lo atascado.",
        "VERDADERO: En Kanban los límites solo se usan los primeros días y luego se van aumentando.",
        "FALSO: La solución ante el retraso es eliminar la columna del tablero."
      ],
      "ans": 1,
      "exp": "FALSO. Subir el límite ante un atascamiento solo oculta el cuello de botella. La regla ágil es \"dejar de empezar y empezar a terminar\", colaborando entre todos para destrabar las tareas pendientes."
    },
    {
      "id": 13,
      "topic": "Parte 4: Modelado - Caso de Uso y Excepciones",
      "q": "Al documentar un Caso de Uso, si en el paso 3 el usuario no cumple los requisitos, ¿cómo se redacta correctamente su flujo de excepción (3a)?",
      "opts": [
        "Flujo alternativo: El usuario ignora la validación y envía un correo manual de apelación.",
        "Flujo de excepción (3a): Si no cumple requisitos, el sistema muestra el error en pantalla y cancela la operación sin guardar datos.",
        "Flujo de excepción: La aplicación reinicia el proceso desde el paso 1 en bucle automático.",
        "Flujo de excepción (3a): El sistema guarda la solicitud como aprobada de forma temporal."
      ],
      "ans": 1,
      "exp": "Un flujo de excepción debe indicar el paso donde se desvía (3a), la condición de error y terminar la acción de forma segura sin guardar información inconsistente."
    },
    {
      "id": 14,
      "topic": "Parte 4: Modelado - Diagrama de Secuencia UML",
      "q": "Al dibujar un Diagrama de Secuencia UML, ¿cuáles son 3 buenas prácticas clave de diseño y notación?",
      "opts": [
        "El actor consulta directo a la BD, todos los mensajes usan flechas rellenas y no se usan bloques de decisión.",
        "El actor se comunica mediante un controlador (no directo a la BD), las respuestas usan líneas punteadas y las decisiones van en un bloque \"alt\".",
        "Solo se permiten dos elementos en el diagrama, las respuestas son líneas continuas y los errores van en otro archivo.",
        "Cada mensaje requiere un ciclo de repetición y la base de datos es la que inicia la comunicación."
      ],
      "ans": 1,
      "exp": "Buenas prácticas: respetar capas de arquitectura (el actor no accede directo a la BD), usar líneas punteadas con flecha abierta para respuestas, y agrupar condiciones alternativas dentro de un bloque \"alt\"."
    },
    {
      "id": 15,
      "topic": "Parte 5: Diseño - Malas Prácticas y SOLID",
      "q": "Si un método decide qué acción tomar usando if-else sobre textos como \"email\", \"sms\" o \"promedio\", ¿qué problemas de diseño y principios SOLID se identifican?",
      "opts": [
        "Problema: Comentarios excesivos; Principios violados: Sustitución de Liskov e Inversión de Dependencias.",
        "Problema: Textos fijos (valores mágicos), falta de polimorfismo y rigidez; Principios violados: Abierto/Cerrado (OCP) y Responsabilidad Única (SRP).",
        "Problema: Código muerto; Principios violados: Segregación de Interfaces exclusivamente.",
        "Problema: Lentitud de memoria; Principio violado: Únicamente Liskov."
      ],
      "ans": 1,
      "exp": "Usar comparaciones de texto con if-else (\"email\", \"sms\") genera código rígido y propenso a errores tipográficos. Viola el principio Abierto/Cerrado (OCP), porque agregar una nueva opción obliga a modificar código existente en vez de extenderlo."
    },
    {
      "id": 16,
      "topic": "Parte 5: Diseño - Patrón Strategy vs Observer",
      "q": "Para reemplazar múltiples if-else por distintas formas de enviar una notificación o evaluar un criterio, ¿por qué se prefiere el patrón Strategy sobre Observer?",
      "opts": [
        "Porque Strategy no utiliza interfaces y compila más rápido.",
        "Porque Strategy permite cambiar algoritmos de manera individual (1 a 1), mientras que Observer es para avisar a múltiples interesados a la vez (1 a N).",
        "Porque Observer ya no se utiliza en programación moderna.",
        "Porque Strategy permite herencia múltiple de clases concretas."
      ],
      "ans": 1,
      "exp": "Strategy se enfoca en intercambiar una lógica o algoritmo específico en una relación 1 a 1 (un servicio delega en la estrategia elegida). Observer, en cambio, sirve para notificar eventos a múltiples observadores suscritos (1 a N)."
    }
  ]
};
