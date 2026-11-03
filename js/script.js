let botonMenu = document.getElementById("boton-menu");
let menu = document.getElementById("menu");

botonMenu.addEventListener("click", function () {
    menu.classList.toggle("hidden");
});

let enlacesMenu = document.querySelectorAll("#menu a");

for (let i = 0; i < enlacesMenu.length; i++) {
    enlacesMenu[i].addEventListener("click", function () {
        menu.classList.add("hidden");
    });
}

let mapa = document.getElementById("mapa");

if (mapa) {
    let manana = [-37.1102, -56.8492];
    let mediodia = [-37.0560, -56.8230];
    let atardecer = [-37.1035, -56.8705];
    let noche = [-37.1093, -56.8588];

    let parada = mapa.getAttribute("data-parada");
    let centro = [-37.085, -56.85];
    let zoom = 12;

    if (parada == "1") {
        centro = manana;
        zoom = 14;
    } else if (parada == "2") {
        centro = mediodia;
        zoom = 13;
    } else if (parada == "3") {
        centro = atardecer;
        zoom = 14;
    } else if (parada == "4") {
        centro = noche;
        zoom = 15;
    }

    let miMapa = L.map("mapa").setView(centro, zoom);

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Mapa &copy; Esri"
    }).addTo(miMapa);

    L.marker(manana).addTo(miMapa).bindPopup("1. Mañana: el mar").bindTooltip("1", { permanent: true });
    L.marker(mediodia).addTo(miMapa).bindPopup("2. Mediodía: La Frontera").bindTooltip("2", { permanent: true });
    L.marker(atardecer).addTo(miMapa).bindPopup("3. Atardecer: el bosque").bindTooltip("3", { permanent: true });
    L.marker(noche).addTo(miMapa).bindPopup("4. Noche: Av. Bunge").bindTooltip("4", { permanent: true });

    L.polyline([manana, mediodia, atardecer, noche], { color: "#0f1f10" }).addTo(miMapa);
}

let botonFamilia = document.getElementById("boton-familia");
let botonAmigos = document.getElementById("boton-amigos");

if (botonFamilia) {
    let familia = document.getElementById("familia");
    let amigos = document.getElementById("amigos");

    botonFamilia.addEventListener("click", function () {
        familia.classList.add("mostrar");
        amigos.classList.remove("mostrar");
        botonFamilia.classList.add("elegido");
        botonAmigos.classList.remove("elegido");
    });

    botonAmigos.addEventListener("click", function () {
        amigos.classList.add("mostrar");
        familia.classList.remove("mostrar");
        botonAmigos.classList.add("elegido");
        botonFamilia.classList.remove("elegido");
    });
}

let preguntas = document.querySelectorAll(".pregunta");
let respuestas = document.querySelectorAll(".respuesta");

for (let i = 0; i < preguntas.length; i++) {
    preguntas[i].addEventListener("click", function () {
        if (respuestas[i].style.display == "block") {
            respuestas[i].style.display = "none";
        } else {
            respuestas[i].style.display = "block";
        }
    });
}

function mostrarError(id, texto) {
    document.getElementById("error-" + id).textContent = texto;
    document.getElementById(id).classList.add("campo-error");
}

function borrarError(id) {
    document.getElementById("error-" + id).textContent = "";
    document.getElementById(id).classList.remove("campo-error");
}

function emailValido(email) {
    if (email.includes("@") && email.includes(".")) {
        return true;
    } else {
        return false;
    }
}

let formReserva = document.getElementById("form-reserva");

if (formReserva) {
    let paquete = document.getElementById("paquete");
    let personas = document.getElementById("personas");
    let fecha = document.getElementById("fecha");
    let traslado = document.getElementById("traslado");
    let fotos = document.getElementById("fotos");
    let nombre = document.getElementById("nombre-reserva");
    let email = document.getElementById("email-reserva");
    let errorGeneral = document.getElementById("error-reserva");
    let resumen = document.getElementById("resumen");
    let mensaje = document.getElementById("mensaje-reserva");

    let hoy = new Date();
    let anio = hoy.getFullYear();
    let mes = hoy.getMonth() + 1;
    let dia = hoy.getDate();
    if (mes < 10) {
        mes = "0" + mes;
    }
    if (dia < 10) {
        dia = "0" + dia;
    }
    let hoyTexto = anio + "-" + mes + "-" + dia;
    fecha.setAttribute("min", hoyTexto);

    let link = window.location.search;
    if (link != "") {
        paquete.value = link.replace("?paquete=", "");
    }

    let nombrePaquete = "";

    function calcularTotal() {
        let precio = 0;
        if (paquete.value == "surf") {
            precio = 32000;
            nombrePaquete = "Mañana de surf";
        } else if (paquete.value == "sandboard") {
            precio = 28000;
            nombrePaquete = "Sandboard";
        } else if (paquete.value == "cabalgata") {
            precio = 38000;
            nombrePaquete = "Cabalgata en el bosque";
        } else if (paquete.value == "cena") {
            precio = 30000;
            nombrePaquete = "Cena en Av. Bunge";
        } else if (paquete.value == "completo") {
            precio = 110000;
            nombrePaquete = "Día completo";
        }

        let subtotal = precio * personas.value;

        let extras = 0;
        if (traslado.checked) {
            extras = extras + 9000 * personas.value;
        }
        if (fotos.checked) {
            extras = extras + 20000;
        }

        let total = subtotal + extras;

        if (precio == 0) {
            document.getElementById("precio-unitario").textContent = "elegí un paquete";
        } else {
            document.getElementById("precio-unitario").textContent = "$" + precio;
        }
        document.getElementById("subtotal").textContent = "$" + subtotal;
        document.getElementById("extras").textContent = "$" + extras;
        document.getElementById("total").textContent = "$" + total;

        return total;
    }

    paquete.addEventListener("change", calcularTotal);
    personas.addEventListener("input", calcularTotal);
    traslado.addEventListener("change", calcularTotal);
    fotos.addEventListener("change", calcularTotal);
    calcularTotal();

    function fechaLinda(texto) {
        return texto.slice(8, 10) + "/" + texto.slice(5, 7) + "/" + texto.slice(0, 4);
    }

    formReserva.addEventListener("submit", function (e) {
        e.preventDefault();

        borrarError("paquete");
        borrarError("personas");
        borrarError("fecha");
        borrarError("nombre-reserva");
        borrarError("email-reserva");

        let errores = 0;

        if (paquete.value == "") {
            mostrarError("paquete", "Elegí uno de los paquetes de la lista.");
            errores = errores + 1;
        }
        if (personas.value < 1 || personas.value > 15) {
            mostrarError("personas", "Poné un número entre 1 y 15.");
            errores = errores + 1;
        }
        if (fecha.value == "") {
            mostrarError("fecha", "Elegí el día que querés ir.");
            errores = errores + 1;
        } else if (fecha.value < hoyTexto) {
            mostrarError("fecha", "Esa fecha ya pasó, elegí una de hoy en adelante.");
            errores = errores + 1;
        }
        if (nombre.value.length < 3) {
            mostrarError("nombre-reserva", "Escribí tu nombre y apellido (al menos 3 letras).");
            errores = errores + 1;
        }
        if (emailValido(email.value) == false) {
            mostrarError("email-reserva", "Revisá el mail, tiene que ser como juan@gmail.com.");
            errores = errores + 1;
        }

        if (errores > 0) {
            errorGeneral.textContent = "Hay " + errores + " dato(s) para corregir. Están marcados en rojo.";
            errorGeneral.classList.remove("oculto");
            return;
        }
        errorGeneral.classList.add("oculto");

        let adicionales = "ninguno";
        if (traslado.checked && fotos.checked) {
            adicionales = "traslado y sesión de fotos";
        } else if (traslado.checked) {
            adicionales = "traslado";
        } else if (fotos.checked) {
            adicionales = "sesión de fotos";
        }

        document.getElementById("texto-resumen").innerHTML =
            "<strong>Paquete:</strong> " + nombrePaquete + "<br>" +
            "<strong>Fecha:</strong> " + fechaLinda(fecha.value) + "<br>" +
            "<strong>Personas:</strong> " + personas.value + "<br>" +
            "<strong>Adicionales:</strong> " + adicionales + "<br>" +
            "<strong>Nombre:</strong> " + nombre.value + "<br>" +
            "<strong>Email:</strong> " + email.value + "<br>" +
            "<strong>Total:</strong> $" + calcularTotal() + " (pesos argentinos)";

        mensaje.classList.add("oculto");
        resumen.classList.remove("oculto");
    });

    document.getElementById("confirmar").addEventListener("click", function () {
        mensaje.textContent = "¡Listo, " + nombre.value + "! Tu reserva para el " + fechaLinda(fecha.value) + " quedó confirmada. Te mandamos los datos a " +
            email.value + ". (Es una simulación, no se cobra nada ni se manda ningún mail.)";
        resumen.classList.add("oculto");
        mensaje.classList.remove("oculto");
        formReserva.reset();
    });

    document.getElementById("cancelar").addEventListener("click", function () {
        resumen.classList.add("oculto");
    });

    formReserva.addEventListener("reset", function () {
        borrarError("paquete");
        borrarError("personas");
        borrarError("fecha");
        borrarError("nombre-reserva");
        borrarError("email-reserva");
        errorGeneral.classList.add("oculto");
        resumen.classList.add("oculto");
        document.getElementById("precio-unitario").textContent = "elegí un paquete";
        document.getElementById("subtotal").textContent = "$0";
        document.getElementById("extras").textContent = "$0";
        document.getElementById("total").textContent = "$0";
    });
}

let formContacto = document.getElementById("form-contacto");

if (formContacto) {
    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let motivo = document.getElementById("motivo");
    let mensaje = document.getElementById("mensaje");
    let contador = document.getElementById("contador");
    let errorGeneral = document.getElementById("error-contacto");
    let enviado = document.getElementById("mensaje-contacto");

    mensaje.addEventListener("input", function () {
        contador.textContent = mensaje.value.length;
    });

    formContacto.addEventListener("submit", function (e) {
        e.preventDefault();
        enviado.classList.add("oculto");

        borrarError("nombre");
        borrarError("email");
        borrarError("motivo");
        borrarError("mensaje");

        let errores = 0;

        if (nombre.value.length < 3) {
            mostrarError("nombre", "Escribí tu nombre (al menos 3 letras).");
            errores = errores + 1;
        }
        if (emailValido(email.value) == false) {
            mostrarError("email", "Revisá el mail, tiene que ser como juan@gmail.com.");
            errores = errores + 1;
        }
        if (motivo.value == "") {
            mostrarError("motivo", "Elegí el motivo de tu consulta.");
            errores = errores + 1;
        }
        if (mensaje.value.length < 10) {
            mostrarError("mensaje", "Escribí un poco más, el mensaje tiene que tener al menos 10 caracteres.");
            errores = errores + 1;
        }

        if (errores > 0) {
            errorGeneral.textContent = "Hay " + errores + " dato(s) para corregir. Están marcados en rojo.";
            errorGeneral.classList.remove("oculto");
            return;
        }

        errorGeneral.classList.add("oculto");
        enviado.textContent = "¡Gracias, " + nombre.value + "! Recibimos tu consulta y te vamos a responder a " +
            email.value + " en uno o dos días hábiles. (Es una simulación, no se envía.)";
        enviado.classList.remove("oculto");
        formContacto.reset();
    });

    formContacto.addEventListener("reset", function () {
        borrarError("nombre");
        borrarError("email");
        borrarError("motivo");
        borrarError("mensaje");
        errorGeneral.classList.add("oculto");
        contador.textContent = "0";
    });
}

let cajaDias = document.getElementById("dias");

if (cajaDias) {
    let cajaClima = document.getElementById("clima-dia");
    let nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let nombresMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let pronostico;

    function describirClima(codigo) {
        if (codigo == 0) {
            return "Despejado";
        } else if (codigo <= 2) {
            return "Parcialmente nublado";
        } else if (codigo == 3) {
            return "Nublado";
        } else if (codigo < 50) {
            return "Niebla";
        } else if (codigo < 60) {
            return "Posible llovizna";
        } else if (codigo < 80) {
            return "Lluvia";
        } else if (codigo < 95) {
            return "Chaparrones";
        } else {
            return "Tormenta";
        }
    }

    function mostrarDia(numero) {
        let fecha = new Date(pronostico.time[numero] + "T12:00");
        let titulo = nombresDias[fecha.getDay()] + " " + fecha.getDate() + " de " + nombresMeses[fecha.getMonth()];

        cajaClima.innerHTML =
            "<h3>" + titulo + "</h3>" +
            "<p class='estado-clima'>" + describirClima(pronostico.weather_code[numero]) + "</p>" +
            "<p class='temperatura'>" + Math.round(pronostico.temperature_2m_max[numero]) + "° / " +
            Math.round(pronostico.temperature_2m_min[numero]) + "°</p>" +
            "<ul>" +
            "<li><strong>Probabilidad de lluvia:</strong> " + pronostico.precipitation_probability_max[numero] + "%</li>" +
            "<li><strong>Viento máximo:</strong> " + Math.round(pronostico.wind_speed_10m_max[numero]) + " km/h</li>" +
            "<li><strong>Sale el sol:</strong> " + pronostico.sunrise[numero].slice(11) + " h</li>" +
            "<li><strong>Se pone el sol:</strong> " + pronostico.sunset[numero].slice(11) + " h</li>" +
            "</ul>";
        cajaClima.classList.remove("oculto");

        let botones = cajaDias.querySelectorAll("button");
        for (let i = 0; i < botones.length; i++) {
            botones[i].classList.remove("elegido");
        }
        botones[numero].classList.add("elegido");
    }

    fetch("https://api.open-meteo.com/v1/forecast?latitude=-37.11&longitude=-56.85&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset&timezone=America%2FArgentina%2FBuenos_Aires&forecast_days=7")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            pronostico = datos.daily;

            let html = "";
            for (let i = 0; i < pronostico.time.length; i++) {
                let fecha = new Date(pronostico.time[i] + "T12:00");
                let texto = nombresDias[fecha.getDay()].slice(0, 3) + " " + fecha.getDate();
                if (i == 0) {
                    texto = "Hoy";
                } else if (i == 1) {
                    texto = "Mañana";
                }
                html = html + "<button type='button' class='pestana font-semibold px-4 py-3 cursor-pointer text-base'>" + texto + "</button>";
            }
            cajaDias.innerHTML = html;

            let botones = cajaDias.querySelectorAll("button");
            for (let i = 0; i < botones.length; i++) {
                botones[i].addEventListener("click", function () {
                    mostrarDia(i);
                });
            }

            mostrarDia(0);
        })
        .catch(function () {
            cajaDias.innerHTML = "<p class='error'>No pudimos cargar el pronóstico. Probá recargar la página en un rato.</p>";
        });
}
