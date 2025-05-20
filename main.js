let jugador = "";
let puntaje = 0;
let puntajeCrupier = 0;
let cartas;
let carta;
let A1 = 1;
let A2 = 11;
const cartasPorJugador = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
const cartasJugador = [];
function generarCarta() {
    let carta = Math.floor(Math.random() * cartasPorJugador.length);
    return cartasPorJugador[carta];
}

function ObtenerValor(carta) {
  if (carta == "A") {
    return A1 = 1, A2 = 11;
  } else if (carta == "J" || carta == "Q" || carta == "K") {
      return 10;
    } else {
        return carta;
    }  
}

function actualizarEstado() {
  // Mostrar las cartas del jugador
  document.getElementById("player-cards").textContent = `Tus cartas: ${cartasJugador.join(", ")}`;
  
  // Calcular el puntaje del jugador
  puntaje = cartasJugador.reduce((total, carta) => {
      const valor = ObtenerValor(carta);
      return total + (Array.isArray(valor) ? valor[0] : valor); // Usar el valor más bajo para el As
  }, 0);

  // Mostrar el puntaje del jugador
  document.getElementById("player-score").textContent = `Tu puntaje: ${puntaje}`;
}

function turnoCrupier() {

  let cartasCrupier = [];


  const dealerInfoElement = document.getElementById("dealer-info");
  dealerInfoElement.style.display = "block";

  const dealerCardsElement = document.getElementById("dealer-cards");
  const dealerScoreElement = document.getElementById("dealer-score");
  dealerCardsElement.textContent = "Cartas del crupier: ";
  dealerScoreElement.textContent = "Puntaje del crupier: ";

  while (puntajeCrupier < 17) {
    let carta = generarCarta();
    cartasCrupier.push(carta);
     dealerCardsElement.textContent = `Cartas del crupier: ${cartasCrupier.join(", ")}`;
    if (carta == "A") {
      ObtenerValor("A");
      if (puntajeCrupier + A2 <= 21) {
        puntajeCrupier += A2;
      }
      else {
        puntajeCrupier += A1;
      }
    }
    else {
      puntajeCrupier += ObtenerValor(carta);
    }   
    dealerScoreElement.textContent = `Puntaje del crupier: ${puntajeCrupier}`;   
  }
  document.getElementById("instructions").textContent = `El puntaje final del crupier es: ${puntajeCrupier}`;
}

document.getElementById("start-game").addEventListener("click", () => {
  const playerNameInput = document.getElementById("player-name");
  jugador = playerNameInput.value.trim();

  if (jugador === "") {
      alert("Por favor, ingresa tu nombre.");
      return;
  }

  document.getElementById("player-info").style.display = "none";
  document.getElementById("game-info").style.display = "block";

  document.getElementById("instructions").textContent = 
      `${jugador}, recibirás 2 cartas. El objetivo es sumar 21 puntos o lo más cercano a 21 sin pasarte.`;

  // Repartir las primeras dos cartas
  for (let i = 0; i < 2; i++) {
      const carta = generarCarta();
      cartasJugador.push(carta);
  }

  actualizarEstado();
});

document.getElementById("draw-card").addEventListener("click", () => {
  const carta = generarCarta();
  cartasJugador.push(carta);
  actualizarEstado();

  if (puntaje > 21) {
      document.getElementById("instructions").textContent = "Te has pasado de 21, ¡has perdido!";
      finalizarJuego();
  } else if (puntaje === 21) {
      document.getElementById("instructions").textContent = "¡Felicidades, has ganado!";
      finalizarJuego();
  }
});

document.getElementById("stand").addEventListener("click", () => {
  document.getElementById("instructions").textContent = "Te has plantado. Turno del crupier.";
  finalizarJuego();
});

document.getElementById("restart-game").addEventListener("click", reiniciarJuego);

function finalizarJuego() {
  document.getElementById("draw-card").disabled = true;
  document.getElementById("stand").disabled = true;

  // Llamar al turno del crupier
  turnoCrupier();

  // Aquí puedes agregar lógica para determinar el ganador
  if (puntaje > 21) {
    document.getElementById("instructions").textContent = "Te has pasado de 21, ¡has perdido!";
  } else if (puntaje == 21) {
    document.getElementById("instructions").textContent = "¡Felicidades, has ganado!";
  } else if (puntaje > puntajeCrupier && puntaje <= 21) {
    document.getElementById("instructions").textContent = "¡Felicidades, has ganado!";
  } else if (puntaje < puntajeCrupier && puntajeCrupier <= 21) {
    document.getElementById("instructions").textContent = "Lo siento, has perdido.";
  } else if (puntaje < puntajeCrupier && puntajeCrupier > 21) {
    document.getElementById("instructions").textContent = "¡Felicidades, has ganado!";
  } else if (puntaje == puntajeCrupier) {
    document.getElementById("instructions").textContent = "Es un empate.";
  }
  document.getElementById("restart-game").style.display = "block";
}

function reiniciarJuego() {
  // Reiniciar variables globales
  jugador = "";
  puntaje = 0;
  puntajeCrupier = 0;
  cartasJugador.length = 0;

  // Ocultar las secciones del juego
  document.getElementById("game-info").style.display = "none";
  document.getElementById("dealer-info").style.display = "none";

  // Limpiar los elementos del DOM
  document.getElementById("player-cards").textContent = "";
  document.getElementById("player-score").textContent = "";
  document.getElementById("dealer-cards").textContent = "";
  document.getElementById("dealer-score").textContent = "";
  document.getElementById("instructions").textContent = "";

  // Volver a mostrar la pantalla inicial
  document.getElementById("player-info").style.display = "block";

  // Ocultar el botón de reinicio
  document.getElementById("restart-game").style.display = "none";

  // Habilitar los botones de juego
  document.getElementById("draw-card").disabled = false;
  document.getElementById("stand").disabled = false;
}

