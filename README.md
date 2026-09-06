# Quiz Ayudantia Ingenieria de Software

Plataforma web interactiva para la ejecucion de quizzes formativos, talleres practicos y dinamicas de evaluacion en tiempo real durante las sesiones de ayudantia de **Ingenieria de Software (Semestre 2026-02)**.

El sistema fue disenado bajo principios rigurosos de **Clean Code**, **SOLID**, **DevSecOps** y en estricto cumplimiento con la **Ley N° 21.719 sobre Proteccion de Datos Personales de Chile**.

---

## 1. Caracteristicas Principales

* **3 Modos de Operacion Integrados**:
  * **Modo Docente / Proyector**: Pantalla principal para proyeccion en aula con temporizador circular animado, grafico de barras de votacion en tiempo real (estilo Kahoot/Mentimeter), revelacion de respuesta con fundamento tecnico y podio con medallas.
  * **Unirse desde el Celular**: Interfaz movil tactil y accesible para que los estudiantes voten las alternativas (A, B, C, D) mediante WebSockets en tiempo real.
  * **Modo Practica Individual (Solo)**: Permite a los estudiantes responder las preguntas a su propio ritmo con retroalimentacion inmediata, justificacion teorica y control de precision/puntaje.
* **Soporte para Diagramas UML**: Preguntas especializadas de analisis de diagramas y deteccion de antipatrones de modelamiento (Casos de Uso, Clases, Actividades, Secuencia).
* **Cumplimiento Legal (Ley N° 21.719 - Chile)**: Privacidad desde el diseno y por defecto, minimizacion de datos mediante alias efimeros, sin persistencia de datos sensibles y sin cookies de rastreo comercial.

---

## 2. Arquitectura de Software

El proyecto aplica una separacion estricta de responsabilidades (SoC) y principios SOLID:

```text
src/
|-- config/              # Parametros globales y definicion legal de privacidad
|   |-- constants.js     # Tiempos, colores de alto contraste y fases del juego
|   |-- privacyPolicy.js # Marco normativo Ley 21.719 de Chile
|-- services/            # Capa de integracion y red desacoplada (DIP)
|   |-- supabaseClient.js# Conexion segura con tolerancia a modo offline
|   |-- realtimeService.js# Abstraccion de canales broadcast WebSockets
|-- utils/               # Sanitizacion y utilidades de seguridad (DevSecOps)
|   |-- sanitizers.js    # Prevencion XSS y generacion de alias anonimos
|-- data/                # Modulos de contenido desacoplados (Open/Closed)
|   |-- index.js         # Catalogo maestro extensible de ayudantias
|   |-- ay02_uml.js      # Banco de 16 preguntas de Modelamiento UML
|-- components/          # Componentes visuales genericos y reutilizables
|   |-- common/          # Button, Card, Badge, PrivacyNotice
|   |-- quiz/            # TimerRing, VoteBars, Leaderboard, QuestionCard
|-- modes/               # Orquestadores de vistas segun rol
|   |-- HubScreen.jsx    # Menu principal y selector de ayudantia
|   |-- HostScreen.jsx   # Panel de control para el proyector
|   |-- PlayerScreen.jsx # Interfaz para el celular del alumno
|   |-- SoloScreen.jsx   # Practica autonoma individual
|-- App.jsx              # Enrutador principal de la aplicacion
|-- index.css            # Sistema de diseno y tokens visuales (Navy / Slate / Amber)
```

### Principios SOLID Aplicados:
* **Single Responsibility (SRP)**: Cada componente resuelve una sola necesidad visual o logica (ejemplo: `TimerRing` calcula y anima el tiempo; `VoteBars` proyecta la distribucion de votos).
* **Open/Closed (OCP)**: Para agregar una nueva ayudantia (ejemplo: Ayudantia 3 de Arquitectura y Patrones), se agrega un archivo en `src/data/` y se registra en `src/data/index.js` sin tocar el motor de juego.
* **Dependency Inversion (DIP)**: Los componentes de UI interactuan con la abstraccion `RealtimeQuizService`, no con el cliente de Supabase directamente.

---

## 3. Seguridad y DevSecOps

* **Proteccion contra XSS**: La funcion `sanitizeNickname` limpia etiquetas HTML, caracteres especiales y restringe la longitud a 15 caracteres maximo.
* **Gestion Segura de Credenciales**: El archivo `.env` esta excluido en `.gitignore`. Se provee `.env.example` como plantilla estandar.
* **Auditoria de Dependencias**: Repositorio verificado con `npm audit` (0 vulnerabilidades conocidas).
* **Higiene de Codigo**: Cero advertencias de linting (`oxlint`), sin emojis en el codigo fuente y sin comentarios superfluos.

---

## 4. Proteccion de Datos Personales (Ley N° 21.719 - Chile)

Esta plataforma implementa tecnicamente los cuatro principios esenciales de la nueva ley de datos chilena:

1. **Minimizacion de Datos**: No se solicita ni procesa RUT, nombre completo, correo institucional, telefono ni datos biometricos.
2. **Uso Exclusivo de Alias Efimeros**: Los estudiantes ingresan mediante un apodo de libre eleccion o un alias aleatorio generado automaticamente (ej: `Estudiante-4821`).
3. **Limitacion de Conservacion**: La informacion de la sesion (votos y puntajes) existe unicamente en la memoria volatil del canal en tiempo real y se destruye al finalizar la sesion.
4. **Sin Rastreos Invasivos**: No se emplean cookies publicitarias ni herramientas de telemetria externa.

---

## 5. Instalacion y Ejecucion Local

### Prerrequisitos:
* Node.js v18 o superior.
* Gestor de paquetes npm.

### Pasos:
```bash
# 1. Clonar el repositorio
git clone https://github.com/Marton1123/Quiz-Ayudantia-Ingenieria-Software.git
cd Quiz-Ayudantia-Ingenieria-Software

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase (VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY)

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicacion estara disponible en: **http://127.0.0.1:5173/**

---

## 6. Despliegue en la Nube (Vercel / Netlify)

1. Conectar el repositorio de GitHub en Vercel o Netlify.
2. Configurar las variables de entorno en el panel de control:
   * `VITE_SUPABASE_URL`
   * `VITE_SUPABASE_ANON_KEY`
3. Comando de construccion: `npm run build`
4. Directorio de salida: `dist`

Con este unico despliegue, la URL sera permanente y valida para todas las ayudantias del semestre.

---

## 7. Como Agregar una Nueva Ayudantia

1. Crear el archivo `src/data/ay03_patrones.js` definiendo metadata y el arreglo de preguntas (`id`, `topic`, `q`, `opts`, `ans`, `exp`).
2. Importar y exportar la nueva ayudantia en `src/data/index.js`:
```javascript
import { ay03Patrones } from "./ay03_patrones.js";

export const AYUDANTIAS = [
  ay02Uml,
  ay03Patrones,
];
```
3. La nueva ayudantia aparecera automaticamente en el Hub, disponible para los 3 modos de juego sin cambios adicionales de codigo.
