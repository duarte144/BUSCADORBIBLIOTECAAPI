# 📚 Biblioteca del Campus

## 1. Descripción del proyecto

Biblioteca del Campus es una aplicación web diseñada para gestionar y consultar un catálogo de libros. Permite visualizar los libros registrados, buscar títulos en una API pública, consultar información bibliográfica, guardar favoritos y administrar la disponibilidad de los ejemplares registrados localmente.

El proyecto se desarrolla utilizando HTML, CSS y JavaScript, con almacenamiento de datos en el navegador para conservar información entre sesiones.

## 2. Objetivos

### Objetivo general

Desarrollar una aplicación web para la consulta y gestión de libros mediante una interfaz intuitiva, el consumo de una API REST y el uso de mecanismos de almacenamiento del navegador.

### Objetivos específicos

- Crear una interfaz web adaptable a diferentes dispositivos.
- Mostrar y filtrar los libros del catálogo local.
- Consumir una API pública mediante solicitudes HTTP.
- Procesar respuestas JSON de forma asíncrona.
- Implementar estados de carga, error y resultados vacíos.
- Guardar información utilizando `localStorage`.
- Implementar funciones para prestar ejemplares y administrar favoritos.
- Incorporar un modo oscuro para mejorar la experiencia de usuario.
- Preparar un ejercicio práctico para que el curso aplique los temas de consumo de API y almacenamiento.

## 3. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de las páginas web. |
| CSS3 | Diseño visual y adaptación a dispositivos. |
| JavaScript | Lógica, eventos y manipulación del DOM. |
| Fetch API | Realización de solicitudes HTTP. |
| Open Library API | Consulta de información de libros. |
| localStorage | Persistencia de datos en el navegador. |
| JSON | Intercambio y almacenamiento de información estructurada. |

## 4. API pública utilizada

El proyecto utiliza **Open Library API**, un servicio público que permite consultar información bibliográfica de libros.

**Endpoint principal:**

https://openlibrary.org/search.json

**Método HTTP:** GET.

**Ejemplo de consulta:**

https://openlibrary.org/search.json?q=harry+potter&page=1&limit=10

### Parámetros utilizados

- `q`: término de búsqueda, como el título o autor.
- `page`: número de página de los resultados.
- `limit`: cantidad de resultados solicitados por página.

### Funcionamiento

1. El usuario introduce un título o autor.
2. JavaScript construye la URL con los parámetros de búsqueda.
3. Se realiza una solicitud HTTP utilizando `fetch()`.
4. La aplicación verifica la respuesta del servidor.
5. Los datos JSON se procesan mediante JavaScript.
6. Los resultados se muestran en tarjetas dentro de la interfaz.

La aplicación contempla estados de carga, errores de conexión y búsquedas sin resultados.

La API se utiliza para consultar libros; las operaciones de préstamo y eliminación del catálogo local se gestionan en el navegador.

## 5. Funcionalidades principales

### Catálogo local

- Visualización de libros registrados.
- Búsqueda por título o información disponible.
- Filtrado por categoría.
- Registro de libros.
- Préstamo de ejemplares disponibles.
- Devolución de ejemplares prestados.
- Actualización automática de la disponibilidad.

### Búsqueda mediante API

- Consulta de libros en Open Library.
- Visualización de información bibliográfica.
- Consulta de portadas cuando están disponibles.
- Navegación entre páginas de resultados.
- Manejo de errores y resultados vacíos.

### Favoritos

- Guardar libros encontrados mediante la API.
- Consultar los libros favoritos.
- Eliminar libros de la lista de favoritos.

### Inicio de sesión

- Las páginas del sistema requieren iniciar sesión (`login.html`).
- Usuario: `ADMIN` — Contraseña: `1234`.
- El botón "Cerrar sesión" termina la sesión y vuelve al login.

### Inicio

- Resumen con títulos, ejemplares disponibles/prestados, préstamos, devoluciones y favoritos.
- Accesos rápidos al catálogo, registro, búsqueda en Open Library y favoritos.

### Preferencias

- Activar o desactivar el modo oscuro.
- Guardar la preferencia visual en el navegador.

## 6. Almacenamiento en el navegador

La aplicación utiliza `localStorage` para conservar datos entre recargas y visitas posteriores desde el mismo navegador y origen.

Las claves utilizadas por la implementación incluyen:

| Clave | Información |
|---|---|
| `catalogo` | Libros registrados y disponibilidad local. |
| `prestamos` | Contador de préstamos registrados. |
| `devoluciones` | Contador de devoluciones registradas. |
| `favoritosAPI` | Libros guardados como favoritos. |
| `cacheOpenLibrary` | Resultados de consultas a la API para reutilizarlos temporalmente. |
| `modo` | Preferencia de apariencia clara u oscura. |
| `usuarioActivo` | Indicador local de sesión iniciada (no guarda la contraseña). |

### Métodos de almacenamiento

- `localStorage.setItem()`: guarda información.
- `localStorage.getItem()`: recupera información.
- `localStorage.removeItem()`: elimina una clave.
- `JSON.stringify()`: convierte objetos JavaScript en texto JSON.
- `JSON.parse()`: convierte texto JSON en objetos JavaScript.

**Nota de seguridad:** `localStorage` no es una base de datos segura ni reemplaza un sistema de autenticación con servidor. El login de este proyecto es una validación local de práctica: las credenciales están en el código JavaScript (`js/app.js`) y cualquier persona con acceso al navegador podría verlas.

## 7. Estructura del proyecto

```text
Biblioteca-del-Campus/
│
├── login.html        (inicio de sesión)
├── index.html        (inicio / resumen)
├── catalogo.html     (catálogo, Open Library y favoritos)
├── registrar.html    (registro de libros)
│
├── css/
│   └── estilos.css
│
├── js/
│   ├── app.js        (sesión, modo nocturno, avisos)
│   └── libros.js     (catálogo, préstamos, devoluciones, API, favoritos)
│
├── ejercicio-Trivia/
│   ├── index.html
│   ├── estilos.css
│   └── scripts.js
│
├── README.md
└── README.txt
```

La estructura puede variar según las páginas adicionales que se incorporen al proyecto.

## 8. Instalación y ejecución

### Requisitos

- Un navegador web actualizado.
- Un editor de código, como Visual Studio Code.
- Conexión a Internet para consultar Open Library.

### Pasos

1. Descargar o clonar el proyecto.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Verificar que las rutas de los archivos CSS y JavaScript sean correctas.
4. Ejecutar `login.html` mediante la extensión Live Server o un servidor web local.
5. Iniciar sesión con `ADMIN` / `1234` e ingresar al catálogo.
6. Realizar búsquedas para comprobar la conexión con la API.

Se recomienda utilizar Live Server en lugar de abrir directamente los archivos mediante `file://`, para evitar problemas de origen y facilitar las pruebas de las solicitudes HTTP.

## 9. Manejo de errores

La aplicación debe contemplar las siguientes situaciones:

- **Carga:** se está consultando la API.
- **Error HTTP:** el servidor devuelve una respuesta no exitosa.
- **Error de conexión:** la solicitud no puede completarse.
- **Sin resultados:** no se encuentran libros para la búsqueda.
- **Resultados disponibles:** la consulta devuelve información que puede mostrarse.

Las restricciones de CORS dependen de la configuración del servidor de la API. Si se presenta un error de conexión, se debe revisar también la consola del navegador.

## 10. Consideraciones

- La búsqueda de Open Library requiere conexión a Internet.
- Los datos guardados en `localStorage` pertenecen al navegador y al origen utilizados.
- Borrar los datos del navegador puede eliminar el catálogo y los favoritos.
- El contador de préstamos local no constituye un sistema institucional de circulación de libros.
- La disponibilidad de portadas y datos bibliográficos depende de la información proporcionada por la API.
- La caché de resultados permite reducir consultas repetidas durante el periodo de validez configurado.

## 11. Cómo funcionan las herramientas utilizadas

Esta sección explica, con ejemplos simplificados, las herramientas principales del proyecto. Los fragmentos de código son ilustrativos; la implementación completa está en `js/libros.js`.

### 11.1 Fetch API y `async/await`

`fetch()` envía una petición HTTP y devuelve una **promesa**: un resultado que todavía no está listo. Con `async/await` el código espera la respuesta sin bloquear la página.

```js
async function buscarLibros(texto) {
  const res = await fetch("https://openlibrary.org/search.json?q=" + encodeURIComponent(texto));
  if (!res.ok) throw new Error("El servidor respondió con código " + res.status);
  return await res.json();
}
```

- `async` marca una función que puede usar `await`.
- `await` pausa la función hasta que la promesa se resuelva.
- `res.ok` es `true` cuando el código HTTP está entre 200 y 299.
- `res.json()` convierte el texto de la respuesta en un objeto JavaScript.

### 11.2 Construcción de la URL con parámetros

Los parámetros se agregan después del signo `?` y se separan con `&`. El texto escrito por el usuario debe pasar por `encodeURIComponent` para que espacios, tildes y símbolos no rompan la URL.

```js
const url = "https://openlibrary.org/search.json" +
  "?q=" + encodeURIComponent("harry potter") +
  "&page=" + pagina +
  "&limit=10";
```

| Parámetro | Función |
|---|---|
| `q` | Término de búsqueda (título o autor). |
| `page` | Página de resultados (permite la navegación entre páginas). |
| `limit` | Cantidad de resultados por página. |

### 11.3 JSON y respuesta de Open Library

La respuesta es un objeto JSON. Los libros están en el arreglo `docs`, que se recorre con `forEach` o `map` para crear una tarjeta por cada libro.

```js
const data = await buscarLibros("harry potter");
data.docs.forEach(libro => {
  console.log(libro.title, libro.author_name, libro.first_publish_year);
});
```

| Campo | Contenido |
|---|---|
| `title` | Título del libro. |
| `author_name` | Arreglo con los autores. |
| `first_publish_year` | Año de la primera publicación. |
| `cover_i` | Identificador de la portada (puede no existir). |

La portada se construye con ese identificador: `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`. Como no todos los libros tienen portada, el código debe comprobar que `cover_i` exista antes de usarlo.

### 11.4 Estados de la interfaz

Una pantalla que consume una API nunca está solo "con datos". Estos son los estados que debe manejar:

| Estado | Cómo se detecta | Qué se muestra |
|---|---|---|
| Cargando | Antes de llamar a `fetch` | Mensaje o indicador de carga. |
| Error HTTP | `res.ok` es `false` | Mensaje con el código recibido (por ejemplo 500). |
| Error de conexión | `fetch` lanza un error (`TypeError`) | Aviso de que no hay conexión. |
| Sin resultados | `docs` llega vacío | Mensaje "No se encontraron libros". |
| Éxito | `docs` tiene elementos | Tarjetas con los libros. |

Un resultado vacío **no es un error**: la consulta funcionó, solo que no hubo coincidencias.

### 11.5 `localStorage` y JSON

`localStorage` guarda pares clave-valor, y **solo acepta texto**. Por eso los arreglos y objetos se convierten con `JSON.stringify` al guardar y con `JSON.parse` al leer.

```js
function guardarFavoritos(favoritos) {
  localStorage.setItem("favoritosAPI", JSON.stringify(favoritos));
}

function leerFavoritos() {
  const raw = localStorage.getItem("favoritosAPI");
  return raw ? JSON.parse(raw) : [];
}
```

`getItem` devuelve `null` si la clave no existe, por eso se usa `raw ? ... : []` para empezar con una lista vacía. Los datos persisten al recargar y al cerrar el navegador, pero se pierden si el usuario borra los datos del sitio.

### 11.6 Caché de resultados con tiempo de vida (TTL)

Para no repetir la misma consulta, la respuesta se guarda junto con la hora en que se obtuvo (clave `cacheOpenLibrary`). Si la respuesta tiene menos minutos que el TTL, se reutiliza; si no, se vuelve a pedir a la API.

```js
const CACHE_TTL = 10 * 60 * 1000;

function leerCache(url) {
  const cache = JSON.parse(localStorage.getItem("cacheOpenLibrary")) || {};
  const hit = cache[url];
  if (hit && Date.now() - hit.hora < CACHE_TTL) return hit.datos;
  return null;
}

function guardarCache(url, datos) {
  const cache = JSON.parse(localStorage.getItem("cacheOpenLibrary")) || {};
  cache[url] = { hora: Date.now(), datos };
  localStorage.setItem("cacheOpenLibrary", JSON.stringify(cache));
}
```

Ventajas: la aplicación responde más rápido y se hacen menos peticiones. Desventaja: durante el TTL el usuario puede ver datos que ya cambiaron en la API.

### 11.7 Tiempo de espera y errores de red

Si la API tarda demasiado, el usuario no sabe qué pasa. `AbortController` permite cancelar la petición después de un tiempo límite.

```js
const ctrl = new AbortController();
const timer = setTimeout(() => ctrl.abort(), 8000);
try {
  const res = await fetch(url, { signal: ctrl.signal });
} finally {
  clearTimeout(timer);
}
```

Si se cancela, `fetch` lanza un error de nombre `AbortError`, que se traduce en un mensaje comprensible ("La API tardó más de 8 segundos").

### 11.8 CORS y seguridad

- **CORS** es una regla del navegador: solo permite leer respuestas de otro origen si el servidor lo autoriza. El error típico es *blocked by CORS policy*. Open Library permite consultas desde el navegador; otras APIs pueden no hacerlo.
- **API keys:** si una API pide clave, no debe subirse a un repositorio público.
- **localStorage no es seguro:** cualquier script de la página puede leerlo. No se deben guardar contraseñas ni datos sensibles (ver nota de la sección 6).

### 11.9 Flujo completo de una búsqueda

```text
Usuario escribe "harry potter" y pulsa Buscar
        │
        ▼
Mostrar "Cargando…"
        │
        ▼
¿Hay respuesta vigente en la caché? ── sí ──► usar datos guardados
        │ no
        ▼
fetch(URL con q, page y limit)
        │
        ├── error de red / tiempo agotado ──► mostrar error
        ├── res.ok = false ─────────────────► mostrar error HTTP
        ▼
res.json() → guardar en caché
        │
        ├── docs vacío ──► "No se encontraron libros"
        ▼
Pintar tarjetas ──► botón "Favorito" ──► guardar en localStorage
```

## 12. Ejercicio para el curso

Como parte de la exposición, se preparó una trivia para que el resto del curso practique los temas de **consumo de API** y **almacenamiento en el navegador**. Está en la carpeta `ejercicio-Trivia/`.

### 12.1 Datos generales

| Aspecto | Detalle |
|---|---|
| Duración | 10 a 12 minutos |
| Nivel | Básico a intermedio |
| Modalidad | Individual o en parejas |
| Requisitos | Un navegador; no se instala nada ni se necesita Internet |
| Carpeta | `ejercicio-Trivia/` |

### 12.2 Objetivos de aprendizaje

Al terminar, el estudiante podrá:

- Explicar qué es una API y para qué sirve `fetch`.
- Reconocer los códigos de estado más comunes (200, 404, 500).
- Entender cómo se usan `async/await`, `encodeURIComponent` y el formato JSON.
- Identificar los estados de carga, error y resultado vacío.
- Explicar cómo se guardan y leen datos con `localStorage`, usando `JSON.stringify` y `JSON.parse`.
- Explicar qué es la caché con TTL, CORS, las API keys y por qué no se guardan datos sensibles en el navegador.

### 12.3 Contenido de la carpeta

| Archivo | Función |
|---|---|
| `index.html` | Estructura de la página: contador, nivel, reloj, puntos, pregunta, opciones y resultado final. |
| `estilos.css` | Diseño visual de la trivia, con modo oscuro automático. |
| `scripts.js` | Preguntas (arreglo `PREGUNTAS`) y lógica: mezcla de opciones, puntaje, reloj, resultado final y mejor puntaje. |

### 12.4 Cómo funciona

Trivia de **22 preguntas** de opción múltiple, divididas en tres niveles: fácil (6), medio (9) y difícil (7). Algunas preguntas incluyen un fragmento de código con un hueco para completar.

- Al responder, la opción correcta se marca en verde y aparece una **explicación**.
- Las opciones se mezclan en cada partida.
- Un **reloj** muestra el tiempo transcurrido.
- Al final se muestra el puntaje, el tiempo total, el desglose por nivel y el mejor puntaje, que se guarda en `localStorage` (clave `trivia:mejor`).

**Cómo ejecutarla:** abrir `ejercicio-Trivia/index.html` en el navegador o con Live Server.

### 12.5 Lista de verificación

1. Aparece la pregunta 1 de 22, con su nivel, el reloj y el contador de puntos.
2. Al elegir una opción, se marca la correcta en verde y se muestra la explicación.
3. El botón "Siguiente" avanza hasta la pregunta 22.
4. Al final se ve el puntaje, el tiempo y el desglose por nivel.
5. Al recargar la página, el mejor puntaje sigue guardado (F12 → Application → Local Storage).

### 12.6 Personalización

Para agregar o cambiar preguntas, se edita el arreglo `PREGUNTAS` al inicio de `scripts.js`. En cada pregunta, la **primera opción de `ops` es la correcta** (las opciones se mezclan al mostrarlas):

```js
{ nivel: "fácil", q: "¿Qué código HTTP indica que todo salió bien?",
  ops: ["200", "404", "500", "301"],
  exp: "200 = OK. Los 4xx son errores del cliente y los 5xx errores del servidor." }
```

Si se cambia la cantidad de preguntas, también se actualiza el texto "22" en `index.html` (subtítulo y contador).

### 12.7 Reto para el curso

Agregar dos preguntas nuevas al arreglo `PREGUNTAS` y comprobar que aparecen en la trivia.

### 12.8 Relación con los contenidos mínimos

| Contenido de la guía | Dónde se practica en la trivia |
|---|---|
| Qué es una API REST, métodos y códigos de estado | Niveles fácil y difícil |
| Estructura de JSON y cómo recorrerlo | Preguntas sobre JSON y `JSON.parse` |
| `fetch` con `async/await` | Preguntas sobre `fetch` y `await` |
| Estados de carga, error y resultado vacío | Nivel medio |
| Parámetros de consulta y API keys | `encodeURIComponent` y API key |
| Qué es CORS | Nivel difícil |
| LocalStorage vs SessionStorage | Nivel medio |
| Guardar objetos con `JSON.stringify` y `JSON.parse` | Preguntas con código para completar |
| Caché de respuestas de la API | Nivel difícil (TTL y utilidad de la caché) |
| Qué no se debe guardar en el navegador | Nivel medio |

### 12.9 Plan de tiempo sugerido

| Minutos | Actividad |
|---|---|
| 0–2 | Explicación del objetivo y de cómo abrir los archivos. |
| 2–12 | Los compañeros resuelven la trivia. |
| 12–14 | Revisión de las preguntas más falladas. |

## 13. Integrantes

- Integrante 1: Johan Daniel Adrada Muñoz
- Integrante 2: Jennifer Quiroga amoon
- Integrante 3: Andrés Guzmán
- Integrante 4: jose luis duarte pachon

## 14. Conclusión

Biblioteca del Campus integra tecnologías web fundamentales para desarrollar una aplicación interactiva. El proyecto combina la consulta de una API REST pública con la manipulación de datos JSON, el manejo asíncrono de solicitudes HTTP y el almacenamiento local en el navegador.

De esta manera, permite aplicar conceptos de desarrollo web, consumo de servicios externos, persistencia de datos y diseño de interfaces. El ejercicio incluido refuerza estos conceptos para que el resto del curso también pueda practicarlos.

## 15. Licencia

Proyecto académico desarrollado con fines educativos.
