export const ay04RepasoP1 = {
  id: "ay04",
  code: "AYUDANTIA4",
  altCodes: ["AY04-REPASO", "REPASO-P1", "P1"],
  number: 4,
  title: "Ayudantía N°4: Repaso Estratégico P1",
  subtitle: "Pautas y Formativas 2026-01: V/F Razonado, INVEST, BDD, Kanban WIP, Secuencia UML y Patrón Strategy",
  course: "Ingeniería de Software",
  semester: "2026-02",
  cardImage: "/assets/ay04_repaso_p1.png",
  description: "Entrenamiento intensivo basado en exámenes reales: justificación técnica de V/F, historias INVEST, escenarios BDD, límites WIP, casos de uso con excepción, secuencia UML y refactorización con Strategy.",
  defaultTimerSeconds: 60,
  pointsPerQuestion: 1000,
  questions: [
    {
      id: 1,
      topic: "Parte 1: V/F — Acoplamiento e Interfaces",
      q: "Evaluación Sumativa 1 (Afirmación 1.a): «Una clase puede usar interfaces en sus atributos y, aun así, seguir fuertemente acoplada a implementaciones concretas.» ¿Cuál es el veredicto oficial y su justificación técnica según pauta?",
      opts: [
        "FALSO: Declarar un atributo con el tipo de una interfaz garantiza el desacoplamiento total en tiempo de compilación y ejecución.",
        "VERDADERO: Si la clase instancia la implementación concreta con 'new' dentro de su constructor, queda acoplada estáticamente en compilación.",
        "FALSO: El acoplamiento solo ocurre si se utilizan métodos estáticos o variables globales en lugar de interfaces públicas.",
        "VERDADERO: Las interfaces en Java y C# siempre generan dependencia de biblioteca física independientemente de cómo se instancien."
      ],
      ans: 1,
      exp: "Veredicto Oficial: VERDADERO. La pauta docente exige indicar que declarar un atributo como interfaz no desacopla si la clase hace instanciación concreta en su constructor (ej: this.notificador = new EmailNotificador()). Al usar el operador 'new', la clase depende en compilación de esa clase específica y no se puede sustituir sin modificar el código fuente. La solución arquitectónica es Inyección de Dependencias (DIP)."
    },
    {
      id: 2,
      topic: "Parte 1: V/F — Compilación vs Ejecución",
      q: "Respecto a la Afirmación 1.a, ¿cuál es la distinción causal clave que busca la pauta docente entre tiempo de compilación y tiempo de ejecución?",
      opts: [
        "La interfaz otorga polimorfismo dinámico en ejecución, pero el operador 'new' en el constructor genera acoplamiento estático en compilación.",
        "El operador 'new' optimiza la memoria en compilación, mientras que la interfaz reduce la latencia en tiempo de ejecución.",
        "Las interfaces se resuelven en compilación estática, mientras que la instanciación con 'new' solo se valida al desplegar en producción.",
        "No existe diferencia causal; tanto la interfaz como el operador 'new' operan exclusivamente en el cargador de clases en runtime."
      ],
      ans: 0,
      exp: "Tip de Pauta: La interfaz provee polimorfismo en tiempo de ejecución, pero si el constructor contiene 'new ImplementacionConcreta()', se produce un acoplamiento rígido en tiempo de compilación. Para obtener el puntaje completo, se debe citar explícitamente el operador 'new' y explicar que la Inyección de Dependencias permite entregar la instancia desde el exterior."
    },
    {
      id: 3,
      topic: "Parte 1: V/F — Herencia vs Composición",
      q: "Evaluación Sumativa 1 (Afirmación 1.b): «Si una solución basada en herencia compila y evita duplicación de código, entonces es preferible a una solución basada en composición.» ¿Cuál es el veredicto oficial de pauta?",
      opts: [
        "VERDADERO: La herencia siempre es superior porque maximiza la reutilización de código y es validada nativamente por el compilador.",
        "VERDADERO: Evitar duplicación es el objetivo supremo de la POO y la composición introduce sobrecarga innecesaria de punteros.",
        "FALSO: Que compile y reutilice código no garantiza buen diseño; la herencia acopla en compilación, rompe encapsulamiento y puede violar LSP.",
        "FALSO: La herencia solo está permitida entre clases abstractas puras, nunca entre clases concretas dentro de un sistema empresarial."
      ],
      ans: 2,
      exp: "Veredicto Oficial: FALSO. La pauta establece que compilar y evitar duplicación no es suficiente. La herencia introduce acoplamiento estático y rígido en compilación, rompe el encapsulamiento ('reutilización de caja blanca') y puede violar el Principio de Sustitución de Liskov (LSP). La máxima de diseño GoF es clara: 'Favorecer la composición sobre la herencia'."
    },
    {
      id: 4,
      topic: "Parte 1: V/F — Caja Blanca y Principio GoF",
      q: "En el análisis de Herencia vs Composición (Pregunta 1.b), ¿por qué la pauta califica a la herencia como 'reutilización de caja blanca' frente a la composición?",
      opts: [
        "Porque la herencia requiere que todas las variables de la superclase sean declaradas públicas obligatoriamente.",
        "Porque la subclase conoce y depende íntimamente de la lógica interna de la superclase, perdiendo la flexibilidad en tiempo de ejecución.",
        "Porque los compiladores modernos ignoran las firmas privadas de la clase padre durante la herencia múltiple.",
        "Porque la composición obliga a escribir pruebas unitarias de caja blanca, mientras que la herencia se prueba con caja negra."
      ],
      ans: 1,
      exp: "Criterio Docente: La herencia es reutilización de 'caja blanca' porque la subclase queda expuesta y subordinada a los detalles de implementación de la superclase. Cualquier cambio en la clase padre puede propagar fallas a las subclases. La composición, en cambio, es reutilización de 'caja negra' basada en contratos/interfaces que se pueden intercambiar dinámicamente en caliente sin recompilar."
    },
    {
      id: 5,
      topic: "Parte 1: V/F — Requisitos No Funcionales",
      q: "Evaluación Sumativa 1 (Afirmación 1.c): «Un requisito no funcional bien especificado debería poder verificarse objetivamente.» ¿Cuál es el veredicto oficial?",
      opts: [
        "FALSO: Los requisitos no funcionales son atributos de calidad subjetivos y dependen de la apreciación individual de cada usuario.",
        "VERDADERO: Sin métricas cuantificables, umbrales y condiciones de prueba objetivas (pasa / no pasa), el requisito resulta ambiguo e inauditable.",
        "FALSO: Solo los requisitos funcionales se verifican objetivamente; los no funcionales solo se documentan como aspiraciones del cliente.",
        "VERDADERO: Pero únicamente si el requisito hace referencia explícita al costo monetario del hardware o la infraestructura de servidores."
      ],
      ans: 1,
      exp: "Veredicto Oficial: VERDADERO. La regla de oro de la asignatura señala: 'Un requisito no funcional sin métrica no es un requisito: es solo una expresión de buenos deseos'. Para que un RNF sea verificable, debe someterse a una prueba determinista (pasa / no pasa) con métricas, condiciones y umbrales exactos."
    },
    {
      id: 6,
      topic: "Parte 1: V/F — Métricas y Verificabilidad RNF",
      q: "Siguiendo los criterios de la pauta para la Afirmación 1.c, ¿cuál de los siguientes ejemplos transforma correctamente una especificación ambigua en un RNF verificable?",
      opts: [
        "Ambiguo: 'El sistema debe ser seguro' → Verificable: 'El sistema no debe tener vulnerabilidades conocidas por los usuarios.'",
        "Ambiguo: 'Alta disponibilidad' → Verificable: 'El sistema debe estar en línea casi todo el tiempo durante los días hábiles del mes.'",
        "Ambiguo: 'El sistema debe ser rápido' → Verificable: 'Tiempo de respuesta < 200 ms al percentil 95 en horas punta con 500 usuarios concurrentes.'",
        "Ambiguo: 'Fácil de usar' → Verificable: 'La interfaz gráfica debe ser intuitiva y visualmente atractiva para los alumnos de primer año.'"
      ],
      ans: 2,
      exp: "Ejemplos Oficiales de Pauta: Reemplaza adjetivos subjetivos ('rápido', 'seguro', 'alta disponibilidad') por números concretos y condiciones auditables: latencia < 200 ms al percentil 95, disponibilidad mensual ≥ 99.9% (máximo 43 min de downtime) o autenticación 2FA obligatoria con cifrado bcrypt."
    },
    {
      id: 7,
      topic: "Parte 2: Requisitos — Clasificación R1 a R5",
      q: "En el caso 'Salas de Estudio' (Evaluación 2.a), se levantaron los requisitos: R1 ('Fácil de usar'), R2 ('Reservar salas'), R3 ('Responder rápido'), R4 ('Impedir reservas inválidas') y R5 ('Ver ocupación'). ¿Cuál es la clasificación técnica correcta?",
      opts: [
        "R1: No Funcional, R2: Funcional, R3: No Funcional, R4: Funcional, R5: No Funcional.",
        "R1: Ambiguo, R2: Funcional, R3: Ambiguo, R4: Regla Oculta / Ambiguo, R5: Funcional.",
        "R1: Funcional, R2: Funcional, R3: Funcional, R4: No Funcional, R5: Ambiguo.",
        "R1: Ambiguo, R2: No Funcional, R3: No Funcional, R4: Regla Oculta, R5: No Funcional."
      ],
      ans: 1,
      exp: "Clasificación Oficial: R1 es Ambiguo (subjetivo, sin métrica de usabilidad); R2 es Funcional (capacidad operativa directa de reserva); R3 es Ambiguo (no define umbral de tiempo en ms/s); R4 es una Regla Oculta / Ambiguo (no define qué condición invalida la reserva); R5 es Funcional (capacidad operativa de consulta para encargados)."
    },
    {
      id: 8,
      topic: "Parte 2: Requisitos — Criterio INVEST",
      q: "En la Pregunta 2.a, ¿por qué el requisito R4 ('El sistema debe impedir reservas inválidas') viola el criterio 'T' (Testable / Testeable) de INVEST y cómo se subsana según pauta?",
      opts: [
        "Porque usa la palabra 'sistema'; se subsana cambiando el actor a 'Como base de datos quiero validar registros...'",
        "Porque no define qué hace inválida una reserva; se subsana explicitando la regla de negocio (ej: solapamiento horario) y su criterio de rechazo comprobable.",
        "Porque impedir errores es un requisito no funcional y las historias de usuario solo admiten funciones de creación CRUD.",
        "Porque excede los 3 pasos de interacción; se subsana dividiendo la reserva en 4 historias de usuario independientes."
      ],
      ans: 1,
      exp: "Criterio INVEST: Para ser Testeable (T), debe ser posible diseñar una prueba objetiva. 'Impedir reservas inválidas' no indica la regla. La pauta lo reescribe como: 'Como encargado de edificio, quiero que el sistema rechace solicitudes con solapamiento horario en la misma sala, para garantizar que no haya doble asignación', con criterio de aceptación automatizado de prueba de intersección horaria."
    },
    {
      id: 9,
      topic: "Parte 2: Requisitos — Escenarios BDD",
      q: "Evaluación Sumativa 1 (Pregunta 2.b): Para formalizar el escenario de prueba Dado / Cuando / Entonces de 'impedir reservas inválidas', ¿cuál es la estructura correcta según pauta?",
      opts: [
        "Dado: Que el sistema está lento. Cuando: Un usuario pide una sala. Entonces: El sistema muestra un error general en pantalla.",
        "Dado: La Sala 101 reservada el 02/10 de 10:00 a 11:30. Cuando: Se solicita la Sala 101 para ese mismo día de 10:30 a 12:00. Entonces: Se rechaza la solicitud, no se persiste en BD y se notifica el tope horario.",
        "Dado: Que una sala cualquiera está ocupada. Cuando: Alguien intenta reservarla en un horario parecido. Entonces: La base de datos cancela la transacción.",
        "Dado: Un estudiante autenticado. Cuando: Presiona el botón de reserva 2 veces seguidas. Entonces: El servidor ignora la segunda petición HTTP."
      ],
      ans: 1,
      exp: "Recomendación de Examen: La pauta penaliza fuertemente el uso de datos genéricos ('un usuario', 'una sala ocupada'). Se debe indicar siempre una prueba determinista: sala exacta (Sala 101), fechas y horas concretas con solapamiento (10:00-11:30 vs 10:30-12:00), rechazo sin persistencia en BD y mensaje explícito de error."
    },
    {
      id: 10,
      topic: "Parte 3: Kanban — Trabajo en Curso (WIP)",
      q: "Evaluación Formativa P1 (Pregunta 3.a): En el tablero con Backlog (4), Análisis (WIP: 2, tareas: 2), Desarrollo (WIP: 2, tareas: 3), Pruebas (WIP: 3, tareas: 2) y Hecho (5), ¿qué significa WIP y qué columna incumple la regla?",
      opts: [
        "WIP significa 'Work In Production'; la columna que incumple es Hecho porque tiene 5 tareas acumuladas.",
        "WIP significa 'Work In Progress' (trabajo comenzado no terminado); la columna que excede su límite es Desarrollo (3 tareas > límite 2).",
        "WIP significa 'Wait In Pipeline'; la columna que incumple es Análisis porque tiene exactamente 2 de 2 tareas posibles.",
        "WIP significa 'Workflow Inspection Process'; la columna que incumple es Pruebas porque su límite es mayor al de Desarrollo."
      ],
      ans: 1,
      exp: "Pauta Oficial Formativa P1: WIP = Work In Progress (Trabajo en Curso: tareas iniciadas pero aún no finalizadas). La columna que infringe la regla es Desarrollo, pues tiene 3 tareas en progreso superando su límite explícito de 2 (se debe escribir formalmente '3 > 2' para puntaje completo)."
    },
    {
      id: 11,
      topic: "Parte 3: Kanban — Cuello de Botella y Lead Time",
      q: "En el tablero de la Formativa P1 (Pregunta 3.a.iii), ¿qué problemas operativos genera en el flujo que la columna Desarrollo exceda su límite WIP?",
      opts: [
        "Genera un cuello de botella que bloquea el flujo, multiplica la multitarea (cambio de contexto) y dispara el Lead Time del equipo.",
        "Reduce inmediatamente el Lead Time porque los desarrolladores terminan más código en paralelo de forma eficiente.",
        "Provoca que la columna Pruebas se colapse automáticamente con exceso de tareas terminadas de forma prematura.",
        "Obliga al Product Owner a cancelar el sprint actual y devolver todas las tareas al Backlog sin excepción."
      ],
      ans: 0,
      exp: "Impacto en el Flujo: Exceder el WIP genera: (1) Cuello de botella en Desarrollo, (2) Multitarea excesiva con pérdida de eficiencia por cambio de contexto, (3) Disparo del Lead Time (demora mayor en entregar valor) y (4) Desabastecimiento aguas abajo (Pruebas se queda sin tareas listas) mientras se represa trabajo aguas arriba."
    },
    {
      id: 12,
      topic: "Parte 3: Kanban — Gestión de Congestión WIP",
      q: "Evaluación Sumativa 1 (Afirmación 3.b): «Si una columna excede repetidamente su límite WIP, aumentar ese límite es siempre la acción más recomendable.» ¿Cuál es el veredicto oficial y la acción ágil correcta?",
      opts: [
        "VERDADERO: Subir el límite es la solución natural para absorber la demanda y evitar que los desarrolladores se sientan presionados.",
        "FALSO: Aumentar el límite solo oculta el cuello de botella; la acción correcta es pausar nuevos ingresos y colaborar ('swarming') para terminar lo atascado.",
        "VERDADERO: En Kanban los límites son sugerencias decorativas que deben expandirse dinámicamente según la cantidad de tickets.",
        "FALSO: La acción correcta ante desbordes es eliminar la columna del tablero y pasar las tareas directamente a producción."
      ],
      ans: 1,
      exp: "Veredicto Oficial: FALSO. La pauta compara subir el límite WIP con quitarle la batería a una alarma de incendio: no apaga el fuego, solo oculta el problema y empeora el caos. La máxima ágil es 'Stop starting, start finishing': detener el ingreso de trabajo nuevo y hacer colaboración focalizada ('swarming') para desbloquear las tareas atascadas y encontrar la causa raíz."
    },
    {
      id: 13,
      topic: "Parte 4: Modelado — Caso de Uso y Excepciones",
      q: "En la especificación del Caso de Uso 'Postular a Ayudantía' (Pregunta 4.a), el paso 3 del flujo normal es 'El Validador comprueba que el estudiante cumple requisitos mínimos'. ¿Cómo se estructura formalmente su flujo de excepción 3a según pauta?",
      opts: [
        "Flujo alternativo: El estudiante ignora la validación y le envía un correo personal al decano para su aprobación.",
        "Flujo de excepción (3a): Si incumple requisitos, el sistema notifica el motivo exacto en pantalla y cancela el flujo sin persistir registros en base de datos.",
        "Flujo de excepción: La base de datos arroja un error 500 y el caso de uso reinicia automáticamente desde el paso 1 en bucle infinito.",
        "Flujo de excepción (3a): El sistema guarda la postulación como aprobada condicionalmente y solicita una carta de recomendación."
      ],
      ans: 1,
      exp: "Regla de Pauta para Excepciones: (1) Indicar el número del paso donde se desvía (3 → 3a), (2) Notificar la condición de ruptura (incumplimiento de promedio o requisitos), y (3) Terminar con una acción clara y consistente: cancelar la operación sin persistir datos en el repositorio."
    },
    {
      id: 14,
      topic: "Parte 4: Modelado — Secuencia UML y Bloque Alt",
      q: "Evaluación Sumativa 1 (Pregunta 4.b): Al diseñar el Diagrama de Secuencia UML para la postulación a ayudantía, ¿cuáles son las 3 reglas de oro obligatorias para obtener el puntaje completo de pauta?",
      opts: [
        "(1) El actor habla directo con la BD, (2) Todos los mensajes son asíncronos con flecha rellena, (3) Se prohíbe el uso de bloques alt.",
        "(1) El actor nunca habla directo con la BD (usa coordinador intermedio), (2) Retornos síncronos con línea punteada, (3) Decisiones dentro de un bloque 'alt'.",
        "(1) Usar solo dos líneas de vida en todo el diagrama, (2) Los retornos son líneas continuas, (3) Los errores se modelan en diagramas separados.",
        "(1) Cada método debe tener un bloque loop, (2) La base de datos inicia la secuencia, (3) No se deben dibujar flechas abiertas."
      ],
      ans: 1,
      exp: "3 Reglas de Oro en Secuencia UML: (1) Arquitectura en capas: el Actor (:Estudiante) nunca interactúa directamente con el Repositorio de BD; debe intermediar un Controlador/Coordinador. (2) Notación formal: los retornos síncronos se grafican con línea punteada y flecha abierta. (3) Bifurcación: las alternativas [cumple requisitos] y [no cumple] se modelan en compartimentos de un bloque combinado 'alt'."
    },
    {
      id: 15,
      topic: "Parte 5: Diseño — Code Smells y SOLID",
      q: "En el examen (Pregunta 5.a), 'GestorNotificaciones' evalúa 'tipo.equals(\"email\")' / '\"sms\"' / '\"bitacora\"', y 'EvaluadorPostulacion' evalúa 'criterio.equals(\"promedio\")'. ¿Qué olores de código y principios SOLID se violan según la pauta?",
      opts: [
        "Olores: Comentarios excesivos y clases huérfanas; Principios violados: Sustitución de Liskov (LSP) e Inversión de Dependencias (DIP).",
        "Olores: String-typing (cadenas mágicas), falta de polimorfismo y rigidez; Principios violados: Abierto/Cerrado (OCP) y Responsabilidad Única (SRP).",
        "Olores: Código muerto y variables largas; Principios violados: Segregación de Interfaces (ISP) y Abierto/Cerrado (OCP).",
        "Olores: Complejidad algorítmica cuadrática; Principios violados: Únicamente el principio de Liskov (LSP)."
      ],
      ans: 1,
      exp: "Diagnóstico Oficial: Olores de código: (1) String-typing / Cadenas mágicas ('email', 'sms') propensas a errores tipográficos en runtime, (2) Ausencia de polimorfismo (if-else en cascada), (3) Rigidez ante el cambio. Principios SOLID comprometidos: OCP (para añadir WhatsApp o un nuevo criterio hay que abrir y modificar código existente) y SRP (múltiples razones para cambiar acumuladas en la misma clase)."
    },
    {
      id: 16,
      topic: "Parte 5: Diseño — Patrón Strategy vs Observer",
      q: "Evaluación Sumativa 1 (Pregunta 5.b): ¿Por qué la refactorización oficial de la pauta docente aplica el Patrón Strategy y descarta el Patrón Observer para este problema?",
      opts: [
        "Porque Strategy no utiliza interfaces, lo que permite compilar más rápido sin crear archivos adicionales en el proyecto.",
        "Porque Strategy encapsula algoritmos intercambiables en relación 1 a 1 (contexto delega en una estrategia), mientras que Observer es para notificación masiva 1 a N.",
        "Porque Observer está deprecado en la programación orientada a objetos moderna y la pauta prohíbe su uso en exámenes.",
        "Porque Strategy permite usar herencia múltiple de clases concretas, mientras que Observer solo funciona con programación funcional."
      ],
      ans: 1,
      exp: "Regla Arquitectónica de Pauta: Strategy vs Observer: Strategy encapsula una familia de algoritmos haciéndolos intercambiables en una relación 1 a 1 (ServicioPostulacion delega ciegamente: notificador.enviar(p); sin if ni switch, cumpliendo OCP). Observer, en cambio, resuelve una relación 1 a N (un emisor notifica a múltiples suscriptores independientes). Usar Observer aquí es un error conceptual."
    }
  ]
};
