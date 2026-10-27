# Juegos web

Portal escolar de minijuegos creado con HTML, CSS y JavaScript. No requiere
instalar dependencias ni ejecutar un proceso de compilación.

## Juegos

- **Piedra, papel o tijera:** juega rondas contra la computadora y lleva el
  marcador.
- **Gato:** partida para dos jugadores en un tablero de 3 × 3.
- **Viborita (Snake):** come frutas, evita chocar y trata de superar tu puntaje.

## Cómo ejecutar

Abre `index.html` en un navegador y selecciona un juego desde el catálogo.
También puedes abrir directamente cualquiera de las páginas dentro de `HTML/`.

## Controles de Viborita

- Usa las flechas del teclado o las teclas **W**, **A**, **S** y **D** para
  cambiar de dirección.
- También puedes usar los botones de dirección en pantalla.
- Pulsa **Iniciar juego** para comenzar o pausar; **Reiniciar** inicia una
  partida nueva.

## Estructura del proyecto

```text
.
├── index.html             # Página principal y catálogo
├── HTML/                  # Página de cada juego
├── scripts/               # Lógica de los juegos
├── styles/
│   ├── styles.css         # Estilos compartidos y del portal
│   ├── gato.css           # Estilos de Gato
│   ├── ppt.css            # Estilos de Piedra, papel o tijera
│   └── vibora.css         # Estilos de Viborita
└── assets/images/         # Imágenes y recursos visuales
```
