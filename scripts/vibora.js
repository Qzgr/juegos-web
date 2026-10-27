(() => {
    const canvas = document.querySelector('#canvas');
    const contexto = canvas?.getContext('2d');
    const puntaje = document.querySelector('#puntajeVibora');
    const estado = document.querySelector('#estadoVibora');
    const botonIniciar = document.querySelector('#iniciarVibora');
    const botonReiniciar = document.querySelector('#reiniciarVibora');
    const controles = document.querySelectorAll('[data-direccion]');

    if (!canvas || !contexto || !puntaje || !estado || !botonIniciar || !botonReiniciar) {
        return;
    }

    const tamanoCelda = 20;
    const columnas = canvas.width / tamanoCelda;
    const filas = canvas.height / tamanoCelda;
    const intervaloMovimiento = 120;
    const direcciones = {
        arriba: { x: 0, y: -1 },
        abajo: { x: 0, y: 1 },
        izquierda: { x: -1, y: 0 },
        derecha: { x: 1, y: 0 },
    };
    const teclas = {
        ArrowUp: 'arriba',
        w: 'arriba',
        W: 'arriba',
        ArrowDown: 'abajo',
        s: 'abajo',
        S: 'abajo',
        ArrowLeft: 'izquierda',
        a: 'izquierda',
        A: 'izquierda',
        ArrowRight: 'derecha',
        d: 'derecha',
        D: 'derecha',
    };

    let serpiente;
    let fruta;
    let direccion;
    let direccionSiguiente;
    let puntos;
    let temporizador = null;
    let terminado = false;

    const generarFruta = () => {
        const lugaresDisponibles = [];
        for (let y = 0; y < filas; y += 1) {
            for (let x = 0; x < columnas; x += 1) {
                if (!serpiente.some((segmento) => segmento.x === x && segmento.y === y)) {
                    lugaresDisponibles.push({ x, y });
                }
            }
        }
        return lugaresDisponibles[Math.floor(Math.random() * lugaresDisponibles.length)] ?? null;
    };

    const dibujar = () => {
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        contexto.fillStyle = '#0b1020';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        if (fruta) {
            contexto.fillStyle = '#f472b6';
            contexto.beginPath();
            contexto.arc(
                (fruta.x + 0.5) * tamanoCelda,
                (fruta.y + 0.5) * tamanoCelda,
                tamanoCelda * 0.38,
                0,
                Math.PI * 2
            );
            contexto.fill();
        }

        serpiente.forEach((segmento, indice) => {
            contexto.fillStyle = indice === 0 ? '#c4b5fd' : '#8b5cf6';
            contexto.beginPath();
            contexto.roundRect(
                segmento.x * tamanoCelda + 1,
                segmento.y * tamanoCelda + 1,
                tamanoCelda - 2,
                tamanoCelda - 2,
                5
            );
            contexto.fill();
        });
    };

    const actualizarMarcador = () => {
        puntaje.textContent = String(puntos);
    };

    const detenerJuego = (mensaje) => {
        window.clearInterval(temporizador);
        temporizador = null;
        terminado = true;
        botonIniciar.textContent = 'Jugar otra vez';
        estado.textContent = mensaje;
    };

    const mover = () => {
        direccion = direccionSiguiente;
        const cabeza = {
            x: serpiente[0].x + direccion.x,
            y: serpiente[0].y + direccion.y,
        };
        const comioFruta = fruta && cabeza.x === fruta.x && cabeza.y === fruta.y;
        const cuerpo = comioFruta ? serpiente : serpiente.slice(0, -1);

        if (
            cabeza.x < 0 ||
            cabeza.x >= columnas ||
            cabeza.y < 0 ||
            cabeza.y >= filas ||
            cuerpo.some((segmento) => segmento.x === cabeza.x && segmento.y === cabeza.y)
        ) {
            detenerJuego(`¡Fin del juego! Puntuación: ${puntos}. Presiona Reiniciar para volver a jugar.`);
            return;
        }

        serpiente.unshift(cabeza);
        if (comioFruta) {
            puntos += 1;
            actualizarMarcador();
            fruta = generarFruta();
            if (!fruta) {
                detenerJuego(`¡Ganaste! Completaste el tablero con ${puntos} puntos.`);
                dibujar();
                return;
            }
        } else {
            serpiente.pop();
        }

        dibujar();
    };

    const iniciarJuego = () => {
        if (temporizador) return;
        if (terminado) reiniciarJuego();
        terminado = false;
        temporizador = window.setInterval(mover, intervaloMovimiento);
        botonIniciar.textContent = 'Pausar';
        estado.textContent = '¡En marcha! Usa las flechas o WASD para moverte.';
        canvas.focus({ preventScroll: true });
    };

    const pausarJuego = () => {
        window.clearInterval(temporizador);
        temporizador = null;
        botonIniciar.textContent = 'Continuar';
        estado.textContent = 'Juego en pausa.';
    };

    function reiniciarJuego() {
        window.clearInterval(temporizador);
        temporizador = null;
        serpiente = [
            { x: 15, y: 15 },
            { x: 14, y: 15 },
            { x: 13, y: 15 },
        ];
        direccion = direcciones.derecha;
        direccionSiguiente = direccion;
        puntos = 0;
        terminado = false;
        fruta = generarFruta();
        actualizarMarcador();
        botonIniciar.textContent = 'Iniciar juego';
        estado.textContent = 'Presiona Iniciar o una flecha para jugar.';
        dibujar();
    }

    const cambiarDireccion = (nombreDireccion) => {
        const nuevaDireccion = direcciones[nombreDireccion];
        if (!nuevaDireccion || terminado) return;

        if (nuevaDireccion.x === -direccion.x && nuevaDireccion.y === -direccion.y) return;
        direccionSiguiente = nuevaDireccion;
        if (!temporizador) iniciarJuego();
    };

    document.addEventListener('keydown', (evento) => {
        const nombreDireccion = teclas[evento.key];
        if (!nombreDireccion) return;
        evento.preventDefault();
        cambiarDireccion(nombreDireccion);
    });

    controles.forEach((boton) => {
        boton.addEventListener('click', () => cambiarDireccion(boton.dataset.direccion));
    });

    botonIniciar.addEventListener('click', () => {
        if (temporizador) {
            pausarJuego();
        } else {
            iniciarJuego();
        }
    });
    botonReiniciar.addEventListener('click', reiniciarJuego);

    reiniciarJuego();
})();
