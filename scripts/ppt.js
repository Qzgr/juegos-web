(() => {
    const opciones = ['piedra', 'papel', 'tijera'];
    const iconos = { piedra: '✊', papel: '✋', tijera: '✌️' };
    const etiquetas = { piedra: 'Piedra', papel: 'Papel', tijera: 'Tijera' };

    const opcionesDeJuego = document.querySelectorAll('[data-eleccion]');
    const resultado = document.querySelector('#resultadoPpt');
    const puntosJugador = document.querySelector('#puntosJugador');
    const puntosComputadora = document.querySelector('#puntosComputadora');
    const botonReiniciar = document.querySelector('#reiniciarPpt');

    if (!opcionesDeJuego.length || !resultado || !puntosJugador || !puntosComputadora || !botonReiniciar) {
        return;
    }

    let marcadorJugador = 0;
    let marcadorComputadora = 0;

    const mostrarResultado = (mensaje, detalle) => {
        const titulo = document.createElement('strong');
        const descripcion = document.createElement('span');
        titulo.textContent = mensaje;
        descripcion.textContent = detalle;
        resultado.replaceChildren(titulo, descripcion);
    };

    opcionesDeJuego.forEach((boton) => {
        boton.addEventListener('click', () => {
            const jugador = boton.dataset.eleccion;
            if (!opciones.includes(jugador)) return;

            const computadora = opciones[Math.floor(Math.random() * opciones.length)];
            let mensaje;

            if (jugador === computadora) {
                mensaje = '¡Empate!';
            } else if (
                (jugador === 'piedra' && computadora === 'tijera') ||
                (jugador === 'papel' && computadora === 'piedra') ||
                (jugador === 'tijera' && computadora === 'papel')
            ) {
                mensaje = '¡Ganaste esta ronda!';
                marcadorJugador += 1;
            } else {
                mensaje = 'La computadora gana esta ronda.';
                marcadorComputadora += 1;
            }

            puntosJugador.textContent = String(marcadorJugador);
            puntosComputadora.textContent = String(marcadorComputadora);
            mostrarResultado(
                mensaje,
                `Tú: ${iconos[jugador]} ${etiquetas[jugador]} · Computadora: ${iconos[computadora]} ${etiquetas[computadora]}`
            );
        });
    });

    botonReiniciar.addEventListener('click', () => {
        marcadorJugador = 0;
        marcadorComputadora = 0;
        puntosJugador.textContent = '0';
        puntosComputadora.textContent = '0';
        mostrarResultado('¡Que comience el juego!', 'Elige piedra, papel o tijera.');
    });
})();
