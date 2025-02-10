const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

let x = 25; // Posición inicial horizontal (esquina superior izquierda)
let y = 20; // Posición inicial vertical (esquina superior izquierda)
let velocidadX = 0.5; // Velocidad horizontal inicial
let velocidadY = 0.5; // Velocidad vertical inicial
let gravedad = 0.8; // Gravedad
let amortiguacion = 0.8; // Factor de amortiguación
let radio = 20; // Radio del círculo
let animacionId;

function dibujarCirculo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, radio, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  ctx.fill();
}

function actualizarPosicion() {
  x += velocidadX; // Actualizar posición horizontal
  y += velocidadY; // Actualizar posición vertical

  // Rebote en la parte inferior
  if (y + radio > canvas.height) {
    y = canvas.height - radio;
    velocidadY = -velocidadY * amortiguacion;
  } else {
    velocidadY += gravedad;
  }

  // Rebote en la parte superior
  if (y - radio < 0) {
    y = radio;
    velocidadY = -velocidadY * amortiguacion;
  }

  // Rebote en el lado derecho
  if (x + radio > canvas.width) {
    x = canvas.width - radio;
    velocidadX = -velocidadX * amortiguacion;
  }

  // Rebote en el lado izquierdo
  if (x - radio < 0) {
    x = radio;
    velocidadX = -velocidadX * amortiguacion;
  }

  // Desplazamiento gradual hacia la derecha y abajo
  velocidadX += 0.08; // Ajusta este valor para controlar la velocidad de desplazamiento
  velocidadY += 0.08; // Ajusta este valor para controlar la velocidad de desplazamiento

  // Detener la animación cuando el círculo esté en la esquina inferior derecha y la velocidad sea baja
  if (x + radio > canvas.width - 10 && y + radio > canvas.height - 10 && Math.abs(velocidadX) < 1 && Math.abs(velocidadY) < 1) {
    cancelAnimationFrame(animacionId);
  }
}

function animar() {
  dibujarCirculo();
  actualizarPosicion();
  animacionId = requestAnimationFrame(animar);
}

animar();