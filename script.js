```javascript
/* =====================================================
   CHOCO SUEÑOS
   CATÁLOGO INTERACTIVO
===================================================== */


/* =====================================================
   OBTENER ELEMENTOS
===================================================== */

const paginas = document.querySelectorAll(".pagina");

const btnAnterior =
    document.getElementById("btnAnterior");

const btnSiguiente =
    document.getElementById("btnSiguiente");

const btnPortada =
    document.getElementById("btnPortada");

const indicador =
    document.getElementById("indicador");


/* =====================================================
   VARIABLES
===================================================== */

let paginaActual = 0;

const totalPaginas = paginas.length;

let cambiando = false;


/* =====================================================
   MOSTRAR PÁGINA
===================================================== */

function mostrarPagina(nuevaPagina) {

    if (cambiando) {
        return;
    }


    if (nuevaPagina < 0) {
        nuevaPagina = 0;
    }


    if (nuevaPagina >= totalPaginas) {
        nuevaPagina = totalPaginas - 1;
    }


    if (nuevaPagina === paginaActual) {
        return;
    }


    cambiando = true;


    const paginaAnterior =
        paginas[paginaActual];

    const paginaNueva =
        paginas[nuevaPagina];


    /* SALIDA */

    paginaAnterior.classList.remove("activa");

    paginaAnterior.classList.add("saliendo");


    /* NUEVA PÁGINA */

    paginaNueva.classList.add("activa");

    paginaNueva.classList.add("entrando");


    paginaActual = nuevaPagina;


    actualizarIndicador();


    setTimeout(() => {

        paginaAnterior.classList.remove("saliendo");

        paginaNueva.classList.remove("entrando");

        cambiando = false;

    }, 600);

}


/* =====================================================
   SIGUIENTE
===================================================== */

function siguientePagina() {

    if (paginaActual < totalPaginas - 1) {

        mostrarPagina(paginaActual + 1);

    }

}


/* =====================================================
   ANTERIOR
===================================================== */

function anteriorPagina() {

    if (paginaActual > 0) {

        mostrarPagina(paginaActual - 1);

    }

}


/* =====================================================
   VOLVER A PORTADA
===================================================== */

function irAPortada() {

    if (paginaActual !== 0) {

        mostrarPagina(0);

    }

}


/* =====================================================
   INDICADOR
===================================================== */

function actualizarIndicador() {

    indicador.textContent =
        `Página ${paginaActual + 1} de ${totalPaginas}`;


    /* DESACTIVAR BOTÓN ANTERIOR */

    if (paginaActual === 0) {

        btnAnterior.style.opacity = "0.35";

        btnAnterior.style.cursor = "default";

    } else {

        btnAnterior.style.opacity = "1";

        btnAnterior.style.cursor = "pointer";

    }


    /* DESACTIVAR BOTÓN SIGUIENTE */

    if (paginaActual === totalPaginas - 1) {

        btnSiguiente.style.opacity = "0.35";

        btnSiguiente.style.cursor = "default";

    } else {

        btnSiguiente.style.opacity = "1";

        btnSiguiente.style.cursor = "pointer";

    }

}


/* =====================================================
   EVENTOS DE LOS BOTONES
===================================================== */

btnSiguiente.addEventListener(
    "click",
    siguientePagina
);


btnAnterior.addEventListener(
    "click",
    anteriorPagina
);


btnPortada.addEventListener(
    "click",
    irAPortada
);


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowRight") {

            siguientePagina();

        }


        if (event.key === "ArrowLeft") {

            anteriorPagina();

        }


        if (event.key === "Home") {

            irAPortada();

        }

    }
);


/* =====================================================
   DESLIZAR EN CELULAR
===================================================== */

let inicioX = 0;

let finalX = 0;


document.addEventListener(
    "touchstart",
    function(event) {

        inicioX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    function(event) {

        finalX =
            event.changedTouches[0].screenX;

        detectarDeslizamiento();

    },
    { passive: true }
);


function detectarDeslizamiento() {

    const distancia =
        finalX - inicioX;


    /* DESLIZAR HACIA LA IZQUIERDA */

    if (distancia < -60) {

        siguientePagina();

    }


    /* DESLIZAR HACIA LA DERECHA */

    if (distancia > 60) {

        anteriorPagina();

    }

}


/* =====================================================
   INICIAR
===================================================== */

actualizarIndicador();
```
