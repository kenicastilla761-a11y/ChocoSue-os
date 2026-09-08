// ===============================
// CHOCO SUEÑOS - CATÁLOGO
// ===============================

const paginas = document.querySelectorAll(".pagina");

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnPortada = document.getElementById("btnPortada");
const indicador = document.getElementById("indicador");

let paginaActual = 0;


// Mostrar página
function mostrarPagina(numero) {

    if (numero < 0) {
        numero = 0;
    }

    if (numero >= paginas.length) {
        numero = paginas.length - 1;
    }

    paginas.forEach((pagina, index) => {

        pagina.classList.remove("activa");

        if (index === numero) {
            pagina.classList.add("activa");
        }

    });

    paginaActual = numero;

    // Actualizar indicador
    if (indicador) {
        indicador.textContent =
            `Página ${paginaActual + 1} de ${paginas.length}`;
    }

    // Activar/desactivar botones
    if (btnAnterior) {
        btnAnterior.disabled = paginaActual === 0;
    }

    if (btnSiguiente) {
        btnSiguiente.disabled =
            paginaActual === paginas.length - 1;
    }
}


// ===============================
// BOTÓN SIGUIENTE
// ===============================

if (btnSiguiente) {

    btnSiguiente.addEventListener("click", function () {

        if (paginaActual < paginas.length - 1) {

            mostrarPagina(paginaActual + 1);

        }

    });

}


// ===============================
// BOTÓN ANTERIOR
// ===============================

if (btnAnterior) {

    btnAnterior.addEventListener("click", function () {

        if (paginaActual > 0) {

            mostrarPagina(paginaActual - 1);

        }

    });

}


// ===============================
// VOLVER A PORTADA
// ===============================

if (btnPortada) {

    btnPortada.addEventListener("click", function () {

        mostrarPagina(0);

    });

}


// ===============================
// TECLADO
// ===============================

document.addEventListener("keydown", function (evento) {

    if (evento.key === "ArrowRight") {

        if (paginaActual < paginas.length - 1) {
            mostrarPagina(paginaActual + 1);
        }

    }

    if (evento.key === "ArrowLeft") {

        if (paginaActual > 0) {
            mostrarPagina(paginaActual - 1);
        }

    }

    if (evento.key === "Home") {

        mostrarPagina(0);

    }

});


// ===============================
// DESLIZAR EN CELULAR
// ===============================

let posicionInicial = 0;
let posicionFinal = 0;

document.addEventListener("touchstart", function (evento) {

    posicionInicial = evento.touches[0].clientX;

});

document.addEventListener("touchend", function (evento) {

    posicionFinal = evento.changedTouches[0].clientX;

    const diferencia = posicionInicial - posicionFinal;

    // Deslizar hacia la izquierda
    if (diferencia > 50) {

        if (paginaActual < paginas.length - 1) {
            mostrarPagina(paginaActual + 1);
        }

    }

    // Deslizar hacia la derecha
    if (diferencia < -50) {

        if (paginaActual > 0) {
            mostrarPagina(paginaActual - 1);
        }

    }

});


// ===============================
// INICIAR CATÁLOGO
// ===============================

mostrarPagina(0);