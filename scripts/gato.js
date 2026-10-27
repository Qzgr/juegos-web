const casillas = Array.from(document.querySelectorAll(".casilla-gato"));
const estado = document.querySelector("#estadoGato");
const botonReiniciar = document.querySelector("#reiniciarGato");
const tablero = Array(9).fill("");
const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let jugadorActual = "X";
let partidaTerminada = false;

function hayGanador(jugador) {
    return combinacionesGanadoras.some(combinacion => combinacion.every(indice => tablero[indice] === jugador));
}

function jugar(evento) {
    const casilla = evento.currentTarget;
    const indice = Number(casilla.dataset.casilla);

    if (partidaTerminada || tablero[indice]) return;

    tablero[indice] = jugadorActual;
    casilla.textContent = jugadorActual;
    casilla.classList.add(`marca-${jugadorActual.toLowerCase()}`);
    casilla.setAttribute("aria-label", `Casilla ${indice + 1}, ${jugadorActual}`);

    if (hayGanador(jugadorActual)) {
        estado.textContent = `¡${jugadorActual} gana la partida!`;
        partidaTerminada = true;
        return;
    }

    if (tablero.every(Boolean)) {
        estado.textContent = "Empate. ¡Buena partida!";
        partidaTerminada = true;
        return;
    }

    jugadorActual = jugadorActual === "X" ? "O" : "X";
    estado.textContent = `Turno de ${jugadorActual}`;
}

function reiniciarPartida() {
    tablero.fill("");
    jugadorActual = "X";
    partidaTerminada = false;
    estado.textContent = "Turno de X";

    casillas.forEach((casilla, indice) => {
        casilla.textContent = "";
        casilla.classList.remove("marca-x", "marca-o");
        casilla.setAttribute("aria-label", `Casilla ${indice + 1}, vacía`);
    });
}

casillas.forEach(casilla => casilla.addEventListener("click", jugar));
botonReiniciar.addEventListener("click", reiniciarPartida);
