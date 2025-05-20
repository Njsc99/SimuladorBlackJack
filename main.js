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

function turnoJugador() {
  const instrucciones = document.getElementById("instrucciones");
  const opcionesAs = document.getElementById("opciones-as");
  const botonAs1 = document.getElementById("as-1");
  const botonAs11 = document.getElementById("as-11");

  // Mostrar opciones al jugador
  instrucciones.textContent = "¿Deseas pedir otra carta o plantarte?";
  document.getElementById("robar-carta").style.display = "inline-block";
  document.getElementById("plantarse").style.display = "inline-block";

  // Evento para pedir carta
  document.getElementById("robar-carta").addEventListener("click", () => {
    const carta = generarCarta();
    cartasJugador.push(carta);
    actualizarEstado();

    if (carta === "A") {
      // Mostrar opciones para el As
      instrucciones.textContent = "El As puede valer 1 o 11. ¿Cuál prefieres?";
      opcionesAs.style.display = "block";

      // Manejar la elección del valor del As
      botonAs1.onclick = () => {
        puntaje += 1;
        opcionesAs.style.display = "none";
        actualizarEstado();
        verificarEstado();
      };

      botonAs11.onclick = () => {
        puntaje += 11;
        opcionesAs.style.display = "none";
        actualizarEstado();
        verificarEstado();
      };
    } else {
      verificarEstado();
    }
  });

  // Evento para plantarse
  document.getElementById("plantarse").addEventListener("click", () => {
    instrucciones.textContent = "Te has plantado. Turno del crupier.";
    finalizarJuego();
  });
}

function verificarEstado() {
  if (puntaje > 21) {
    document.getElementById("instrucciones").textContent = "Te has pasado de 21, ¡has perdido!";
    finalizarJuego();
  } else if (puntaje === 21) {
    document.getElementById("instrucciones").textContent = "¡Felicidades, has ganado!";
    finalizarJuego();
  }
}

function actualizarEstado() {
  
  document.getElementById("cartas-jugador").textContent = `Tus cartas: ${cartasJugador.join(", ")}`;
  puntaje = cartasJugador.reduce((total, carta) => {
      const valor = ObtenerValor(carta);
      return total + (Array.isArray(valor) ? valor[0] : valor);
  }, 0);
  document.getElementById("puntaje-jugador").textContent = `Tu puntaje: ${puntaje}`;
}

function turnoCrupier() {

  let cartasCrupier = [];


  const dealerInfoElement = document.getElementById("crupier-info");
  dealerInfoElement.style.display = "block";

  const dealerCardsElement = document.getElementById("cartas-crupier");
  const dealerScoreElement = document.getElementById("puntaje-crupier");
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
  document.getElementById("instrucciones").textContent = `El puntaje final del crupier es: ${puntajeCrupier}`;
}

document.getElementById("comenzar-juego").addEventListener("click", () => {
  const nombreJugadorInput = document.getElementById("nombre-jugador");
  jugador = nombreJugadorInput.value.trim();

  if (jugador === "") {
      alert("Por favor, ingresa tu nombre.");
      return;
  }
  document.getElementById("turno-jugador").textContent = `Turno de ${jugador}`;
  document.getElementById("jugador-info").style.display = "none";
  document.getElementById("juego-info").style.display = "block";
  document.getElementById("instrucciones").textContent = `${jugador}, recibirás 2 cartas. El objetivo es sumar 21 puntos o lo más cercano a 21 sin pasarte.`;

  for (let i = 0; i < 2; i++) {
      const carta = generarCarta();
      cartasJugador.push(carta);
  }

  actualizarEstado();
});

document.getElementById("robar-carta").addEventListener("click", () => {
  const carta = generarCarta();
  cartasJugador.push(carta);
  actualizarEstado();

  if (puntaje > 21) {
      document.getElementById("instrucciones").textContent = "Te has pasado de 21, ¡has perdido!";
      finalizarJuego();
  } else if (puntaje === 21) {
      document.getElementById("instrucciones").textContent = "¡Felicidades, has ganado!";
      finalizarJuego();
  }
});

document.getElementById("plantarse").addEventListener("click", () => {
  document.getElementById("instrucciones").textContent = "Te has plantado. Turno del crupier.";
  finalizarJuego();
});

document.getElementById("reiniciar-juego").addEventListener("click", reiniciarJuego);

document.getElementById("ver-historial").addEventListener("click", mostrarHistorial);

function finalizarJuego() {
  document.getElementById("robar-carta").disabled = true;
  document.getElementById("plantarse").disabled = true;
  
  turnoCrupier();
  let resultado;

  if (puntaje > 21) {
    resultado = "Gana la Casa";
    document.getElementById("instrucciones").textContent = "Te has pasado de 21, ¡has perdido!";
  } else if (puntaje === 21) {
    resultado = "Gana el Jugador";
    document.getElementById("instrucciones").textContent = "¡Felicidades, has ganado!";
  } else if (puntaje > puntajeCrupier && puntaje <= 21) {
    resultado = "Gana el Jugador";
    document.getElementById("instrucciones").textContent = "¡Felicidades, has ganado!";
  } else if (puntaje < puntajeCrupier && puntajeCrupier <= 21) {
    resultado = "Gana la Casa";
    document.getElementById("instrucciones").textContent = "Lo siento, has perdido.";
  } else if (puntaje < puntajeCrupier && puntajeCrupier > 21) {
    resultado = "Gana el Jugador";
    document.getElementById("instrucciones").textContent = "¡Felicidades, has ganado!";
  } else if (puntaje === puntajeCrupier) {
    resultado = "Empate";
    document.getElementById("instrucciones").textContent = "Es un empate.";
  }
// Aqui estoy guardando el resultado de la partida en el localStorage
const partida = {
    jugador: jugador,
    puntajeJugador: puntaje,
    puntajeCrupier: puntajeCrupier,
    resultado: resultado,
    fecha: new Date().toLocaleString()
  };

  let historial = JSON.parse(localStorage.getItem("historialPartidas")) || [];
  historial.push(partida);
  localStorage.setItem("historialPartidas", JSON.stringify(historial));

  document.getElementById("reiniciar-juego").style.display = "block";
}

function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historialPartidas")) || [];
  const historialBody = document.getElementById("historial-body");
  historialBody.innerHTML = "";
  historial.forEach(partida => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${partida.jugador}</td>
      <td>${partida.puntajeJugador}</td>
      <td>${partida.puntajeCrupier}</td>
      <td>${partida.resultado}</td>
      <td>${partida.fecha}</td>
    `;
    historialBody.appendChild(fila);
  });
  document.getElementById("historial").style.display = "block";
}

function reiniciarJuego() {
  // Se reinician las variables globales y se ocultan los botones para que se vea la pantalla limpia al comenzar nuevamente.
  jugador = "";
  puntaje = 0;
  puntajeCrupier = 0;
  cartasJugador.length = 0;
  document.getElementById("juego-info").style.display = "none";
  document.getElementById("crupier-info").style.display = "none";
  document.getElementById("cartas-jugador").textContent = "";
  document.getElementById("puntaje-jugador").textContent = "";
  document.getElementById("cartas-crupier").textContent = "";
  document.getElementById("puntaje-crupier").textContent = "";
  document.getElementById("instrucciones").textContent = "";
  document.getElementById("jugador-info").style.display = "block";
  document.getElementById("reiniciar-juego").style.display = "none";
  document.getElementById("historial").style.display = "none";
  document.getElementById("robar-carta").disabled = false;
  document.getElementById("plantarse").disabled = false;
}

