let jugador;
let puntaje;
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
    console.log("Tu carta N°" +(i+1) +" "+ "es: " + carta);
  }
  if (cartasJugador.includes("A")) {
    ObtenerValor("A");
    console.log("El valor de tu carta es: " + A1 + " o " + A2); 
    console.log("el A puede valer 1 o 11, ¿cual prefieres?");
    let respuesta = prompt("Escribe 1 o 11");
    while (respuesta != A1 && respuesta != A2) {
      respuesta = prompt("Respuesta no válida, el A vale 1 o 11, ¿cual prefieres?");
    }
    if (respuesta == A1) {
      console.log("El valor de tu carta A es: " + A1);
      if (cartasJugador[0] != "A") {
        puntaje = ObtenerValor(cartasJugador[0]) + A1;
        alert("Tu carta N°1 es:"+ cartasJugador[0] + "\n" + "Tu carta N°2 es:"+ cartasJugador[1] + "\n" + "Tu puntaje es: " + puntaje);
      } else {
        puntaje = ObtenerValor(cartasJugador[1]) + A1;
        alert("Tu carta N°1 es:"+ cartasJugador[0] + "\n" + "Tu carta N°2 es:"+ cartasJugador[1] + "\n" + "Tu puntaje es: " + puntaje);
      }
    } else if (respuesta == A2) {
        console.log("El valor de tu carta A es: " + A2);
        if (cartasJugador[0] != "A") {
          puntaje = ObtenerValor(cartasJugador[0]) + A2;
          alert("Tu carta N°1 es:"+ cartasJugador[0] + "\n" + "Tu carta N°2 es:"+ cartasJugador[1] + "\n" + "Tu puntaje es: " + puntaje);
        } else {
          puntaje = ObtenerValor(cartasJugador[1]) + A2;
          alert("Tu carta N°1 es:"+ cartasJugador[0] + "\n" + "Tu carta N°2 es:"+ cartasJugador[1] + "\n" + "Tu puntaje es: " + puntaje);
        }
    } else {
        console.log("No se ha seleccionado un valor válido para el A");
    }
  } else {
    puntaje = ObtenerValor(cartasJugador[0]) + ObtenerValor(cartasJugador[1]);
    alert("Tu carta N°1 es:"+ cartasJugador[0] + "\n" + "Tu carta N°2 es:"+ cartasJugador[1] + "\n" + "Tu puntaje es: " + puntaje);
  }
}

function turnoJugador() {
  let respuesta = prompt("Deseas pedir otra carta o decides plantarte?"+ "\n" + "1. Pedir Carta"+ "\n" + "2. Plantarse");
  while (respuesta != 1 && respuesta != 2) {
    respuesta = prompt("Respuesta no válida, ¿deseas pedir otra carta o decides plantarte? /n 1. Pedir Carta /n 2. Plantarse");
  }
  if (respuesta == 1) {
    carta = generarCarta();
    cartasJugador.push(carta);
    console.log("Tu carta N°" + (cartasJugador.length) + " es: " + carta);
    if (carta == "A") {
      ObtenerValor("A");
      console.log("El valor de tu carta es: " + A1 + " o " + A2); 
      console.log("el A puede valer 1 o 11, ¿cual prefieres?");
      let respuesta = prompt("Escribe 1 o 11");
      while (respuesta != A1 && respuesta != A2) {
        respuesta = prompt("Respuesta no válida, el A vale 1 o 11, ¿cual prefieres?");
      }
      if (respuesta == A1) {
        console.log("El valor de tu carta A es: " + A1);
        puntaje += A1;
        alert("Tu carta N°" + (cartasJugador.length) + " es: " + carta + "\n" + "Tu puntaje es: " + puntaje);
      } else if (respuesta == A2) {
          console.log("El valor de tu carta A es: " + A2);
          puntaje += A2;
          alert("Tu carta N°" + (cartasJugador.length) + " es: " + carta + "\n" + "Tu puntaje es: " + puntaje);
      } else {
          console.log("No se ha seleccionado un valor válido para el A");
      }
    } else {
        puntaje += ObtenerValor(carta);
        alert("Tu carta N°" + (cartasJugador.length) + " es: " + carta + "\n" + "Tu puntaje es: " + puntaje);
    }

    if (puntaje > 21) {
      alert("Te has pasado de 21, has perdido!");
    } else if (puntaje == 21) {
      alert("Felicidades, has ganado!");
    } else {
      turnoJugador();
    }
  } else {
    turnoCrupier();
    console.log("Te has plantado, tu puntaje es: " + puntaje);
    if (puntaje > 21) {
      alert("Te has pasado de 21, has perdido!");
    } else if (puntaje == 21) {
      alert("Felicidades, has ganado!");
    } else {
      alert("Te has plantado, tu puntaje es: " + puntaje);
    }
  }
}

function turnoCrupier() {

  let cartasCrupier = [];
  while (puntajeCrupier < 17) {
    let carta = generarCarta();
    cartasCrupier.push(carta);
    console.log("La carta del crupier es: " + carta);
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
  }
  console.log("El puntaje del crupier es: " + puntajeCrupier);
}

function evaluarGanador() {
  if (puntaje > 21) {
    alert("Te has pasado de 21, has perdido!");
  } else if (puntaje == 21) {
    alert("Felicidades, has ganado!");
  } else if (puntaje > puntajeCrupier) {
    alert("Felicidades, has ganado!");
  } else if (puntaje < puntajeCrupier) {
    alert("Lo siento, has perdido!");
  } else {
    alert("Es un empate!");
  }
}

function mostrarMenu() {
  let opcion;
  do {
      opcion = prompt(
          "Menú de Opciones:\n" +
          "1. Mostrar información del jugador\n" +
          "2. Mostrar puntaje actual\n" +
          "3. Salir\n" +
          "Elige una opción (1, 2 o 3):"
      );

      switch (opcion) {
          case "1":
              console.log("Información del jugador: " + jugador);
              break;
          case "2":
              console.log("Puntaje actual: " + puntaje);
              break;
          case "3":
              console.log("Saliendo del menú...");
              break;
          default:
              console.log("Opción no válida. Por favor, elige 1, 2 o 3.");
      }
  } while (opcion !== "3");
}

comenzarJuego();
turnoJugador();
evaluarGanador();
mostrarMenu();
