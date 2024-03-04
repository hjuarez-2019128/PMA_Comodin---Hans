var listaPalabras = [
    "ANIMALES",
    "ESCUELA",
    "PINGUINO",
    "ESTUDIANTE",
    "COMPUTADORA",
    "ZAPATO",
    "CIUDAD",
    "BOSQUE",
    "FUTBOL",
    "TALLER",
    "PLATAFORMA",
    "TECLADO",
    "CASA",
    "PISTOLAS",
    "HERMANO"
];

var intentos = 10;
var palabraSeleccionada;
var letrasAdivinadas = [];


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function dibujarAhorcado() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    ctx.strokeStyle = "white";
    switch (intentos) {
        case 9:
            // Dibuja la cabeza
            ctx.beginPath();
            ctx.arc(150, 80, 30, 0, Math.PI * 2);
            ctx.stroke();
            break;
        
        case 8:
            ctx.moveTo(10,10);
            ctx.lineTo(10,1000); // Establece el punto final de la línea
            ctx.stroke(); // Dibuja la línea
            break;
        case 7:
             // Segundo Elemento linea horizontal
             ctx.moveTo(150,20);
             ctx.lineTo(10,20);
             ctx.stroke();
             break;
        case 6:
            ctx.moveTo(150,20);
            ctx.lineTo(150,50);
            ctx.stroke(); // Dibuja la línea
            break;
        case 5:
            // Dibuja el cuerpo
            ctx.moveTo(150, 110);
            ctx.lineTo(150, 230);
            ctx.stroke();
            break;
        case 4:
            // Dibuja el brazo izquierdo
            ctx.moveTo(150, 140);
            ctx.lineTo(120, 180);
            ctx.stroke();
            break;
        case 3:
            // Dibuja el brazo derecho
            ctx.moveTo(150, 140);
            ctx.lineTo(180, 180);
            ctx.stroke();
            break;
        case 2:
            // Dibuja la pierna izquierda
            ctx.moveTo(150, 230);
            ctx.lineTo(130, 280);
            ctx.stroke();
            break;
        case 1:
            // Dibuja la pierna derecha
            ctx.moveTo(150, 230);
            ctx.lineTo(170, 280);
            ctx.stroke();
            break;
    }
}

function mostrarPreguntaCorrecta() {
    alert("Juego terminado. Has perdido. La palabra correcta era: " + palabraSeleccionada);
}

function iniciar() {
    alert("Juego iniciado");
    const aleatorio = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    palabraSeleccionada = aleatorio;

    for (var inicial = 1; inicial <= aleatorio.length; inicial++) {
        const caja = document.createElement("div");
        caja.classList.add('cajaStyle');
        caja.setAttribute("id", "p" + inicial);
        const elemento = document.getElementById("palabra");
        elemento.appendChild(caja);
        document.getElementById("p" + inicial).innerHTML = aleatorio[inicial - 1];
    }

    const bInicio = document.getElementById("inicio");
    bInicio.disabled = true;
}

function verificarLetra(letra) {
    if (palabraSeleccionada.includes(letra)) {
        letrasAdivinadas.push(letra); // Agregar la letra a las letras adivinadas
        if (letrasAdivinadas.length === palabraSeleccionada.length) {
            // Si se han adivinado todas las letras, mostrar el mensaje de "Ganaste"
            mostrarMensajeGanaste();
        }
        return true;
    } else {
        intentos--;
        if (intentos <= 0) {
            mostrarPreguntaCorrecta();
        } else {
            alert("Intentos restantes: " + intentos);
        }
        return false;
    }
}


function seleccionLetra(x) {
    var showAlert = false;
    var conteo = 0;

    for (var l in palabraSeleccionada) {
        conteo = conteo + 1;
        if (x == palabraSeleccionada[l]) {
            const letraResaltada = document.getElementById("p" + conteo);
            letraResaltada.classList.add('letraResaltada');
        }
    }
    if (!verificarLetra(x)) {
        desactivarBoton(x);
    }

    // Verificar si se han adivinado todas las letras
    if (letrasAdivinadas.length === palabraSeleccionada.length) {
        mostrarMensajeGanaste();
    }
    dibujarAhorcado();
}

function mostrarMensajeGanaste() {
    alert("¡Ganaste! Has adivinado la palabra correctamente: " + palabraSeleccionada);
}


function desactivarBoton(letra) {
    const botones = document.querySelectorAll('.boton-letra');
    botones.forEach(boton => {
        if (boton.textContent === letra) {
            boton.disabled = true;
        }
    });
}


const botonReiniciar = document.getElementById("reiniciar");
botonReiniciar.addEventListener("click", function () {
    // Utiliza el método reload() del objeto location para recargar la página
    location.reload();
});

