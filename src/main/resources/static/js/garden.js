
/* ========================================
   CUENTA REGRESIVA DEL REGALO
   ======================================== */

const pantallaCuenta = document.getElementById("pantalla-cuenta");
const elementosTiempo = {
    dias: document.getElementById("dias"),
    horas: document.getElementById("horas"),
    minutos: document.getElementById("minutos"),
    segundos: document.getElementById("segundos")
};

// Medianoche del 16 de octubre, hora de Guatemala (UTC-6).
const fechaSorpresa = new Date("2026-10-16T00:00:00-06:00");

function actualizarCuentaRegresiva() {
    const ahora = Date.now();
    const diferencia = fechaSorpresa.getTime() - ahora;

    if (diferencia <= 0) {
        pantallaCuenta.hidden = true;
        pantallaSobre.hidden = false;

        clearInterval(temporizadorCuenta);
        return;
    }

    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor((diferencia % 86400000) / 3600000);
    const minutos = Math.floor((diferencia % 3600000) / 60000);
    const segundos = Math.floor((diferencia % 60000) / 1000);

    elementosTiempo.dias.textContent = String(dias).padStart(2, "0");
    elementosTiempo.horas.textContent = String(horas).padStart(2, "0");
    elementosTiempo.minutos.textContent = String(minutos).padStart(2, "0");
    elementosTiempo.segundos.textContent = String(segundos).padStart(2, "0");
}

// Comprobar la fecha inmediatamente y después cada segundo.
actualizarCuentaRegresiva();
const temporizadorCuenta = setInterval(actualizarCuentaRegresiva, 1000);

const sobre = document.getElementById("sobre");
const textoSobre = document.getElementById("texto-sobre");
const botonContinuar = document.getElementById("continuar");

const pantallaSobre = document.getElementById("pantalla-sobre");
const pantallaJardin = document.getElementById("pantalla-jardin");
const campoJardin = document.getElementById("jardin");

const musica = document.getElementById("musica");
const botonMusica = document.getElementById("boton-musica");
const mensajeFlor = document.getElementById("mensaje-flor");

const campoLuciérnagas = document.getElementById("luciérnagas");
const campoPetalos = document.getElementById("petalos-caidos");
const corazonCielo = document.getElementById("corazon-cielo");
const particulasCorazon = document.getElementById("particulas-corazon");

let sobreAbierto = false;
let temporizadorMensaje;
const floresDescubiertas = new Set();
let finalIniciado = false;

const pensamientos = [
    "Tu sonrisa tiene el poder de iluminar hasta la noche más oscura",
    "Tú haces que el mundo sea un lugar infinitamente más bonito",
    "Si cada pensamiento en ti fuera una flor, este jardín no tendría fin.",
    "Ojalá hoy encuentres tantas razones para sonreír como estrellas hay en el cielo",
    "Hay bellezas que no necesitan hacer ruido para ser inolvidables",
    "Que este nuevo año de tu vida esté lleno de pequeños momentos mágicos",
    "Esta flor es un recordatorio de que alguien desea verte feliz"
];

// Rosas, lilas y flores blancas.
const colores = [
    { color: "#e99bbd", brillo: "#ffd5e7", tipo: "rosa" },
    { color: "#bda0ed", brillo: "#e4d5ff", tipo: "lila" },
    { color: "#f1e9f3", brillo: "#ffffff", tipo: "blanca" },
    { color: "#d98eae", brillo: "#ffc6de", tipo: "rosa" },
    { color: "#d0b6f4", brillo: "#eee2ff", tipo: "lila" },
    { color: "#fff4e8", brillo: "#ffffff", tipo: "blanca" },
    { color: "#e8b0cc", brillo: "#ffe0ef", tipo: "rosa" }
];

const reducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

sobre.addEventListener("click", () => {
    if (sobreAbierto) return;

    sobreAbierto = true;
    sobre.classList.add("abierto");
    sobre.setAttribute("aria-expanded", "true");

    textoSobre.textContent =
        "Un pequeño detalle preparado con cariño...";

    setTimeout(() => {
        botonContinuar.classList.remove("oculto");
        textoSobre.textContent = "Hay algo más esperándote";
    }, 950);
});

botonContinuar.addEventListener("click", async () => {
    pantallaSobre.classList.remove("activa");
    pantallaSobre.hidden = true;

    pantallaJardin.hidden = false;
    pantallaJardin.classList.add("activa");

    floresDescubiertas.clear();
    finalIniciado = false;

    crearFlores();
    crearLuciérnagas();
    crearPetalos();

    try {
        musica.volume = 0.45;
        await musica.play();

        botonMusica.textContent = "♫ Pausar música";
        botonMusica.setAttribute("aria-pressed", "true");
    } catch (error) {
        botonMusica.textContent = "♫ Reproducir música";
        botonMusica.setAttribute("aria-pressed", "false");
    }
});

function crearFlores() {
    campoJardin.replaceChildren();

    pensamientos.forEach((pensamiento, indice) => {
        const flor = document.createElement("button");
        flor.type = "button";
        flor.className = "flor";
        flor.setAttribute(
            "aria-label",
            `Descubrir mensaje ${indice + 1}`
        );

        const estilo = colores[indice];

        flor.style.setProperty("--color-flor", estilo.color);
        flor.style.setProperty("--brillo-flor", estilo.brillo);

        flor.style.animationDelay = reducirMovimiento
            ? "0s"
            : `${indice * 0.18}s`;

        // Cada flor se construye con seis pétalos.
        
const tallo = document.createElement("span");
tallo.className = "tallo";
flor.appendChild(tallo);

const hojaIzquierda = document.createElement("span");
hojaIzquierda.className = "hoja hoja-izquierda";
flor.appendChild(hojaIzquierda);

const hojaDerecha = document.createElement("span");
hojaDerecha.className = "hoja hoja-derecha";
flor.appendChild(hojaDerecha);

for (let i = 0; i < 6; i++) {
    const petalo = document.createElement("span");
    petalo.className = "petalo";
    flor.appendChild(petalo);
}

const centro = document.createElement("span");
centro.className = "centro-flor";
flor.appendChild(centro);
 

flor.addEventListener("click", () => {
    // Registrar esta flor sin contarla dos veces.
    floresDescubiertas.add(indice);

    // Comprobar si ya descubrió todas las flores.
    if (
        floresDescubiertas.size === pensamientos.length &&
        !finalIniciado
    ) {
        finalIniciado = true;
        mostrarCorazon();
    }

    // Cancelar una transición pendiente
    clearTimeout(temporizadorMensaje);

    // Ocultar el mensaje actual
    mensajeFlor.classList.remove("visible");

    // Esperar a que termine el desvanecimiento
    temporizadorMensaje = setTimeout(() => {
        mensajeFlor.textContent = pensamiento;

        // Permitir que el navegador aplique el estado oculto
        void mensajeFlor.offsetWidth;

        // Mostrar el nuevo mensaje
        mensajeFlor.classList.add("visible");
    }, 250);
});



        campoJardin.appendChild(flor);
    });
}

function crearLuciérnagas() {
    if (!campoLuciérnagas) return;

    campoLuciérnagas.replaceChildren();

    // Sin movimiento reducido, añadimos pequeños puntos de luz.
    const cantidad = reducirMovimiento ? 0 : 16;

    for (let i = 0; i < cantidad; i++) {
        const luz = document.createElement("span");
        luz.className = "luciérnaga";

        luz.style.setProperty("--x", `${5 + Math.random() * 90}%`);
        luz.style.setProperty("--y", `${10 + Math.random() * 80}%`);
        luz.style.setProperty("--tamaño", `${2 + Math.random() * 3}px`);
        luz.style.setProperty("--duracion", `${4 + Math.random() * 6}s`);
        luz.style.setProperty("--retraso", `${-Math.random() * 8}s`);

        campoLuciérnagas.appendChild(luz);
    }
}

function crearPetalos() {
    if (!campoPetalos) return;

    campoPetalos.replaceChildren();

    // Unos pocos pétalos para mantener una atmósfera delicada.
    const paletaPetalos = [
        "#efb5d0",
        "#d6c0f3",
        "#fff0f5",
        "#e6c2d9"
    ];

    const cantidad = reducirMovimiento ? 0 : 9;

    for (let i = 0; i < cantidad; i++) {
        const petalo = document.createElement("span");
        petalo.className = "petalo-caido";

        petalo.style.setProperty("--x", `${Math.random() * 95}%`);
        petalo.style.setProperty("--ancho", `${5 + Math.random() * 5}px`);
        petalo.style.setProperty(
            "--color-petalo",
            paletaPetalos[i % paletaPetalos.length]
        );
        petalo.style.setProperty("--duracion", `${12 + Math.random() * 12}s`);
        petalo.style.setProperty("--retraso", `${-Math.random() * 20}s`);

        campoPetalos.appendChild(petalo);
    }
}


function crearCorazon() {
    if (!particulasCorazon || !corazonCielo) return;

    particulasCorazon.replaceChildren();

    // Creamos los puntos siguiendo una curva matemática de corazón.
    const cantidad = reducirMovimiento ? 25 : 70;

    for (let i = 0; i < cantidad; i++) {
        const t = (Math.PI * 2 * i) / cantidad;

        // Ecuación paramétrica de un corazón.
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t);

        const particula = document.createElement("span");
        particula.className = "particula-corazon";

        // Convertimos las coordenadas a porcentajes.
        const posicionX = 50 + (x / 18) * 45;
        const posicionY = 45 - (y / 17) * 43;

        particula.style.setProperty("--x", `${posicionX}%`);
        particula.style.setProperty("--y", `${posicionY}%`);

        const tamano = i % 7 === 0 ? 5 : 2.5 + Math.random() * 2;
        particula.style.setProperty("--tamano", `${tamano}px`);

        const retraso = reducirMovimiento ? 0 : i * 0.045;
        particula.style.setProperty("--retraso", `${retraso}s`);

        particula.style.setProperty(
            "--opacidad",
            `${0.65 + Math.random() * 0.35}`
        );

        if (i % 7 === 0) {
            particula.classList.add("destello");
        }

        particulasCorazon.appendChild(particula);
    }
}


function mostrarCorazon() {
    if (!corazonCielo || !particulasCorazon) return;

    crearCorazon();

    // Mostrar el corazón y dejar que el navegador
    // registre sus dimensiones.
    corazonCielo.classList.add("visible");

    requestAnimationFrame(() => {
        animarLuciernagasHaciaCorazon();
    });
}

function animarLuciernagasHaciaCorazon() {
    if (reducirMovimiento) return;
    if (!campoLuciérnagas || !corazonCielo) return;

    const luces = [
        ...campoLuciérnagas.querySelectorAll(".luciérnaga")
    ];

    if (luces.length === 0) return;

    const area = campoLuciérnagas.getBoundingClientRect();
    const corazon = corazonCielo.getBoundingClientRect();

    if (!area.width || !area.height) return;

    // Cada luciérnaga se dirige a un punto distinto
    // de la curva del corazón.
    luces.forEach((luz, indice) => {
        const t = (Math.PI * 2 * indice) / luces.length;

        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t);

        const destinoX = corazon.left + corazon.width *
            (0.5 + (x / 18) * 0.45);

        const destinoY = corazon.top + corazon.height *
            (0.45 - (y / 17) * 0.43);

        const porcentajeX =
            ((destinoX - area.left) / area.width) * 100;

        const porcentajeY =
            ((destinoY - area.top) / area.height) * 100;

        luz.style.setProperty("--x-inicial", luz.style.left);
        luz.style.setProperty("--y-inicial", luz.style.top);

        luz.style.animation = "none";
        luz.style.transition =
            `left ${2.5 + (indice % 4) * 0.35}s ease-in-out,
             top ${2.5 + (indice % 4) * 0.35}s ease-in-out,
             opacity 1.2s ease,
             box-shadow 1.5s ease`;

        luz.style.left = `${porcentajeX}%`;
        luz.style.top = `${porcentajeY}%`;
        luz.style.opacity = "1";
        luz.style.boxShadow =
            "0 0 8px 3px rgba(255, 231, 163, 0.85), " +
            "0 0 20px 7px rgba(255, 190, 91, 0.4)";
    });
}


botonMusica.addEventListener("click", async () => {
    if (musica.paused) {
        try {
            await musica.play();

            botonMusica.textContent = "♫ Pausar música";
            botonMusica.setAttribute("aria-pressed", "true");
        } catch (error) {
            botonMusica.textContent = "No se pudo reproducir";
        }
    } else {
        musica.pause();

        botonMusica.textContent = "♫ Reproducir música";
        botonMusica.setAttribute("aria-pressed", "false");
    }
});
