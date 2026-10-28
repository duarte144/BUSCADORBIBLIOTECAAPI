const $ = (id) => document.getElementById(id);

const PREGUNTAS = [
  { nivel: "fácil", q: "¿Qué es una API?",
    ops: ["Un conjunto de reglas para que dos programas se comuniquen", "Un lenguaje de programación", "Un tipo de base de datos", "Un programa para editar imágenes"],
    exp: "Una API define cómo pedir datos o acciones a otro programa, por ejemplo un servidor." },
  { nivel: "fácil", q: "¿Qué función del navegador usamos para pedir datos a una API?",
    ops: ["fetch()", "print()", "alert()", "request.send()"],
    exp: "fetch() hace la petición HTTP y devuelve una promesa." },
  { nivel: "fácil", q: "¿En qué formato responden la mayoría de las APIs web?",
    ops: ["JSON", "PDF", "MP3", "Word"],
    exp: "JSON es texto con estructura de objetos y arreglos, fácil de leer en JavaScript." },
  { nivel: "fácil", q: "¿Qué código HTTP indica que todo salió bien?",
    ops: ["200", "404", "500", "301"],
    exp: "200 = OK. Los 4xx son errores del cliente y los 5xx errores del servidor." },
  { nivel: "fácil", q: "Una API responde con el código 404. ¿Qué significa?",
    ops: ["No se encontró lo que pediste", "Todo salió bien", "El servidor se cayó", "No tienes permiso"],
    exp: "404 = no encontrado. Una búsqueda sin resultados suele devolverlo." },
  { nivel: "fácil", q: "¿Qué método HTTP se usa para consultar (leer) datos?",
    ops: ["GET", "DELETE", "PUT", "HIDE"],
    exp: "GET lee datos. POST crea, PUT actualiza y DELETE borra." },
  { nivel: "medio", q: "Completa el código para esperar la respuesta:",
    code: "const res = ______ fetch(url);",
    ops: ["await", "wait", "stop", "then"],
    exp: "await pausa la función async hasta que la promesa se resuelva." },
  { nivel: "medio", q: "¿Para qué sirve encodeURIComponent?",
    code: 'const url = API + "/search?q=" + encodeURIComponent(texto);',
    ops: ["Para que espacios y tildes del texto no rompan la URL", "Para cifrar la contraseña", "Para convertir la respuesta a JSON", "Para acelerar la petición"],
    exp: "Convierte caracteres especiales (espacio, tildes, &, ?) en una forma segura para usar en una URL." },
  { nivel: "medio", q: "Mientras la API aún no responde, ¿qué debería mostrar la interfaz?",
    ops: ["Un mensaje o indicador de carga", "Una pantalla en blanco", "El resultado anterior sin avisar", "Nada, el usuario debe esperar"],
    exp: "Los tres estados mínimos de una interfaz con API son: cargando, error y resultado (o vacío)." },
  { nivel: "medio", q: "El usuario busca algo y la API devuelve una lista vacía. ¿Qué es lo correcto?",
    ops: ["Mostrar un mensaje de “sin resultados”", "Mostrar un error rojo", "Recargar la página", "No mostrar nada"],
    exp: "Un resultado vacío no es un error: hay que explicárselo al usuario con un mensaje claro." },
  { nivel: "medio", q: "¿Qué tipo de dato guarda localStorage?",
    ops: ["Solo texto", "Arreglos y objetos directamente", "Imágenes y videos", "Funciones"],
    exp: "localStorage solo guarda cadenas de texto; por eso convertimos los objetos." },
  { nivel: "medio", q: "¿Con qué función convertimos un arreglo a texto para guardarlo?",
    code: 'localStorage.setItem("favoritos", ______(favoritos));',
    ops: ["JSON.stringify", "JSON.parse", "toNumber", "String.split"],
    exp: "JSON.stringify convierte un objeto o arreglo en texto." },
  { nivel: "medio", q: "¿Con qué función volvemos a convertir ese texto en un arreglo?",
    code: 'const lista = ______(localStorage.getItem("favoritos"));',
    ops: ["JSON.parse", "JSON.stringify", "Array.new", "Number"],
    exp: "JSON.parse hace el camino contrario a JSON.stringify." },
  { nivel: "medio", q: "¿Qué devuelve localStorage.getItem(\"clave\") si esa clave no existe?",
    ops: ["null", "undefined", "Un error", "Una cadena vacía"],
    exp: "Devuelve null. Por eso se escribe: raw ? JSON.parse(raw) : []." },
  { nivel: "medio", q: "¿Qué diferencia hay entre localStorage y sessionStorage?",
    ops: ["sessionStorage se borra al cerrar la pestaña", "sessionStorage guarda más datos", "localStorage se borra al recargar", "No hay diferencia"],
    exp: "localStorage persiste hasta que se borre; sessionStorage dura solo mientras la pestaña está abierta." },
  { nivel: "medio", q: "¿Cuál de estos datos NO debemos guardar en localStorage?",
    ops: ["Contraseñas", "Países favoritos", "El tema claro u oscuro", "Una búsqueda reciente"],
    exp: "Cualquier script de la página puede leer localStorage, así que nunca guardes datos sensibles." },
  { nivel: "difícil", q: "Una API responde con el código 500. ¿Qué pasó?",
    ops: ["Falló algo en el servidor", "Escribiste mal la URL", "No hay resultados", "Todo salió bien"],
    exp: "Los 5xx son errores del servidor. La interfaz debe mostrar un mensaje y permitir reintentar." },
  { nivel: "difícil", q: "Aparece el error “blocked by CORS policy”. ¿Qué significa?",
    ops: ["El navegador bloqueó la petición porque el servidor no permite ese origen", "Tu internet está desconectado", "El JSON está mal escrito", "La API se quedó sin datos"],
    exp: "CORS es una regla de seguridad del navegador: el servidor debe indicar qué orígenes pueden consultarlo." },
  { nivel: "difícil", q: "Una API pide una API key. ¿Cuál es la mejor práctica?",
    ops: ["No subirla a un repositorio público", "Publicarla en el README", "Compartirla en el chat del curso", "Escribirla en la URL de GitHub"],
    exp: "La API key identifica quién usa el servicio. Si se filtra, otros pueden gastar tu cuota." },
  { nivel: "difícil", q: "Guardamos las respuestas de la API en caché con un tiempo de vida (TTL). ¿Cuándo deja de ser válida una respuesta guardada?",
    code: "if (Date.now() - hit.time < CACHE_TTL) return hit.data;",
    ops: ["Cuando pasa más tiempo que el TTL", "Nunca", "Cuando se cierra el navegador", "Cuando el usuario cambia de pestaña"],
    exp: "Pasado el TTL, la caché se considera vencida y se vuelve a pedir el dato a la API." },
  { nivel: "difícil", q: "La API tarda 10 segundos y el usuario no sabe qué pasa. ¿Qué herramienta permite cancelar la petición tras un tiempo límite?",
    ops: ["AbortController", "localStorage", "JSON.parse", "encodeURIComponent"],
    exp: "Con AbortController se cancela el fetch pasado un tiempo y se muestra un mensaje de error." },
  { nivel: "difícil", q: "¿Por qué la caché de respuestas ayuda a la aplicación?",
    ops: ["Evita peticiones repetidas y la hace más rápida", "Hace que los datos sean siempre nuevos", "Reemplaza la API por completo", "Protege la API key"],
    exp: "Si el dato ya está guardado y no ha vencido, no hace falta pedirlo otra vez." }
];

let i = 0, puntos = 0, inicio = 0, reloj = null;
const porNivel = {};

function mezclar(a) {
  const b = [...a];
  for (let k = b.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [b[k], b[j]] = [b[j], b[k]]; }
  return b;
}

function formato(ms) {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
}

function iniciarReloj() {
  clearInterval(reloj);
  inicio = Date.now();
  $("reloj").textContent = "⏱ 00:00";
  reloj = setInterval(() => { $("reloj").textContent = "⏱ " + formato(Date.now() - inicio); }, 1000);
}

function textoPuntos() { return puntos + (puntos === 1 ? " punto" : " puntos"); }

function mostrar() {
  const p = PREGUNTAS[i];
  $("contador").textContent = "Pregunta " + (i + 1) + " de " + PREGUNTAS.length;
  $("nivel").textContent = "Nivel " + p.nivel;
  $("puntos").textContent = textoPuntos();
  $("prog").style.width = (i / PREGUNTAS.length * 100) + "%";
  $("pregunta").textContent = p.q;
  $("codigo").hidden = !p.code;
  $("codigo").textContent = p.code || "";
  $("exp").hidden = true; $("sig").hidden = true;
  const cont = $("opciones"); cont.innerHTML = "";
  mezclar(p.ops).forEach(texto => {
    const b = document.createElement("button");
    b.className = "opt"; b.textContent = texto;
    b.onclick = () => responder(b, texto === p.ops[0]);
    cont.appendChild(b);
  });
}

function responder(btn, acierto) {
  const p = PREGUNTAS[i];
  document.querySelectorAll(".opt").forEach(b => {
    b.disabled = true;
    if (b.textContent === p.ops[0]) b.classList.add("ok");
  });
  porNivel[p.nivel] = porNivel[p.nivel] || { ok: 0, total: 0 };
  porNivel[p.nivel].total++;
  if (acierto) { puntos++; porNivel[p.nivel].ok++; } else btn.classList.add("ko");
  $("puntos").textContent = textoPuntos();
  $("exp").textContent = (acierto ? "✔ ¡Correcto! " : "✘ Casi. ") + p.exp;
  $("exp").hidden = false;
  $("sig").textContent = i === PREGUNTAS.length - 1 ? "Ver resultado" : "Siguiente →";
  $("sig").hidden = false;
}

function mejorGuardado() {
  try { return Number(localStorage.getItem("trivia:mejor")) || 0; } catch { return 0; }
}
function guardarMejor(n) {
  try { localStorage.setItem("trivia:mejor", String(n)); } catch {}
}

function final() {
  clearInterval(reloj);
  const ms = Date.now() - inicio;
  $("juego").hidden = true; $("final").hidden = false;
  $("prog").style.width = "100%";
  const total = PREGUNTAS.length;
  const pct = puntos / total;
  $("nota").textContent = puntos + " / " + total;
  $("mensaje").textContent =
    pct === 1 ? " ¡Perfecto! Dominas el tema." :
    pct >= 0.8 ? " ¡Muy bien! Repasa lo que fallaste." :
    pct >= 0.6 ? " Vas bien, pero repasa las explicaciones." :
    "A repasar: vuelve a jugar y lee cada explicación.";
  $("tiempo").textContent = "Tiempo total: " + formato(ms);
  $("desglose").textContent = ["fácil", "medio", "difícil"]
    .map(n => n + ": " + (porNivel[n] ? porNivel[n].ok : 0) + "/" + (porNivel[n] ? porNivel[n].total : 0)).join("  ·  ");
  const previo = mejorGuardado();
  if (puntos > previo) { guardarMejor(puntos); $("mejor").textContent = " ¡Nuevo mejor puntaje guardado en tu navegador!"; }
  else $("mejor").textContent = "Tu mejor puntaje guardado: " + previo + " / " + total;
}

$("sig").onclick = () => { i++; i < PREGUNTAS.length ? mostrar() : final(); };
$("otra").onclick = () => {
  i = 0; puntos = 0;
  Object.keys(porNivel).forEach(k => delete porNivel[k]);
  $("final").hidden = true; $("juego").hidden = false;
  iniciarReloj(); mostrar();
};
iniciarReloj();
mostrar();