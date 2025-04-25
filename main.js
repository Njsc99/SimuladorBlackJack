let jugador;
let puntaje;
let cartas;
let carta;
const cartasPorJugador = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
const cartasJugador = [];
function generarCarta() {
    let carta = Math.floor(Math.random() * cartasPorJugador.length);
    return cartasPorJugador[carta];
}

console.log(generarCarta());

function ObtenerValor(carta) {
    if (carta == "A") {
        return A1 = 1, A2 = 11;
    } else if (carta == "J" || carta == "Q" || carta == "K") {
        return 10;
    } else {
        return carta;
    }
}

console.log(ObtenerValor("A"));
console.log(A1);
console.log(A2);

function comenzarJuego() {
  jugador = prompt("Bienvenido al juego de BlackJack, ¿cuál es tu nombre?");
  console.log(jugador + ", Vamos a comenzar el juego de BlackJack");
  console.log("Recibirás 2 cartas, y el objetivo es sumar 21 puntos o lo más cercano a 21 sin pasarse.");
  console.log("Las cartas son: " + cartasPorJugador.join(", "));
  for (let i = 0; i < 2; i++) {
    let carta = generarCarta();
    cartasJugador.push(carta);
    console.log("Tu carta" + " " +(i+1) +" "+ "es: " + carta);
  }
  if (cartasJugador.includes("A")) {
    ObtenerValor("A");
    console.log("El valor de tu carta es: " + A1 + " o " + A2); 
    console.log("el A puede valer 1 o 11, ¿cual prefieres?");
    let respuesta = prompt("Escribe 1 o 11");
    if (respuesta == 1) {
      console.log("El valor de tu carta A es: " + A1);
      if (cartasJugador[0] != "A") {
        puntaje = ObtenerValor(cartasJugador[0]) + A1;
        console.log("Tu puntaje es: " + puntaje);
      } else {
        puntaje = ObtenerValor(cartasJugador[0]) + A1;
        console.log("Tu puntaje es: " + puntaje);
      }
    }
  }

}

comenzarJuego();