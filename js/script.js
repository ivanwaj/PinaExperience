let botonMenu = document.getElementById("boton-menu");
let menu = document.getElementById("menu");

function cerrarMenu() {
    menu.classList.add("hidden");
    botonMenu.setAttribute("aria-expanded", "false");
}

botonMenu.addEventListener("click", function () {
    let estaCerrado = menu.classList.toggle("hidden");
    botonMenu.setAttribute("aria-expanded", String(!estaCerrado));
});

let enlacesMenu = menu.querySelectorAll("a");

for (let i = 0; i < enlacesMenu.length; i++) {
    enlacesMenu[i].addEventListener("click", cerrarMenu);
}

document.addEventListener("keydown", function (evento) {
    if (evento.key == "Escape" && botonMenu.getAttribute("aria-expanded") == "true") {
        cerrarMenu();
        botonMenu.focus();
    }
});

let mapa = document.getElementById("mapa");

if (mapa) {
    let manana = [-37.1102, -56.8492];
    let mediodia = [-37.0560, -56.8230];
    let atardecer = [-37.1035, -56.8705];
    let noche = [-37.1093, -56.8588];

    let parada = mapa.dataset.parada;
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

    let miMapa = L.map("mapa", { scrollWheelZoom: false }).setView(centro, zoom);

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Mapa &copy; Esri",
        maxZoom: 18
    }).addTo(miMapa);

    L.marker(manana).addTo(miMapa).bindPopup("<b>1. Mañana</b><br>El mar").bindTooltip("1", { permanent: true });
    L.marker(mediodia).addTo(miMapa).bindPopup("<b>2. Mediodía</b><br>La Frontera").bindTooltip("2", { permanent: true });
    L.marker(atardecer).addTo(miMapa).bindPopup("<b>3. Atardecer</b><br>El bosque").bindTooltip("3", { permanent: true });
    L.marker(noche).addTo(miMapa).bindPopup("<b>4. Noche</b><br>Av. Bunge").bindTooltip("4", { permanent: true });

    L.polyline([manana, mediodia, atardecer, noche], { color: "#0f1f10", weight: 4, dashArray: "8 8" }).addTo(miMapa);

    if (!parada) {
        miMapa.fitBounds([manana, mediodia, atardecer, noche], { padding: [40, 40] });
    }
}

let botonFamilia = document.getElementById("boton-familia");
let botonAmigos = document.getElementById("boton-amigos");

if (botonFamilia) {
    botonFamilia.addEventListener("click", function () {
        document.getElementById("familia").classList.add("mostrar");
        document.getElementById("amigos").classList.remove("mostrar");
        botonFamilia.classList.add("elegido");
        botonAmigos.classList.remove("elegido");
    });

    botonAmigos.addEventListener("click", function () {
        document.getElementById("amigos").classList.add("mostrar");
        document.getElementById("familia").classList.remove("mostrar");
        botonAmigos.classList.add("elegido");
        botonFamilia.classList.remove("elegido");
    });
}

let preguntas = document.querySelectorAll(".pregunta");

for (let i = 0; i < preguntas.length; i++) {
    preguntas[i].addEventListener("click", function () {
        let respuesta = preguntas[i].nextElementSibling;

        if (respuesta.style.display == "block") {
            respuesta.style.display = "none";
        } else {
            respuesta.style.display = "block";
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
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function nombreValido(nombre) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ' -]{3,}$/.test(nombre);
}

function agregarDato(caja, titulo, valor) {
    let negrita = document.createElement("strong");
    negrita.textContent = titulo + ": ";
    caja.appendChild(negrita);
    caja.appendChild(document.createTextNode(valor));
    caja.appendChild(document.createElement("br"));
}

function fechaLinda(fecha) {
    let partes = fecha.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
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

    let hoy = new Date();
    let mes = String(hoy.getMonth() + 1).padStart(2, "0");
    let dia = String(hoy.getDate()).padStart(2, "0");
    let hoyTexto = hoy.getFullYear() + "-" + mes + "-" + dia;
    fecha.min = hoyTexto;

    let link = new URLSearchParams(window.location.search);
    if (link.get("paquete")) {
        paquete.value = link.get("paquete");
    }

    function calcularTotal() {
        let precio = 0;
        if (paquete.value == "surf") {
            precio = 32000;
        } else if (paquete.value == "sandboard") {
            precio = 28000;
        } else if (paquete.value == "cabalgata") {
            precio = 38000;
        } else if (paquete.value == "cena") {
            precio = 30000;
        } else if (paquete.value == "completo") {
            precio = 110000;
        }

        let cantidad = Number(personas.value);
        if (cantidad < 0) {
            cantidad = 0;
        }
        let subtotal = precio * cantidad;

        let extras = 0;
        if (traslado.checked) {
            extras = extras + 9000 * cantidad;
        }
        if (fotos.checked) {
            extras = extras + 20000;
        }

        let total = subtotal + extras;

        if (precio == 0) {
            document.getElementById("precio-unitario").textContent = "elegí un paquete";
        } else {
            document.getElementById("precio-unitario").textContent = "$" + precio.toLocaleString("es-AR");
        }
        document.getElementById("subtotal").textContent = "$" + subtotal.toLocaleString("es-AR");
        document.getElementById("extras").textContent = "$" + extras.toLocaleString("es-AR");
        document.getElementById("total").textContent = "$" + total.toLocaleString("es-AR");

        return total;
    }

    paquete.addEventListener("change", function () {
        borrarError("paquete");
        calcularTotal();
    });
    personas.addEventListener("input", function () {
        borrarError("personas");
        calcularTotal();
    });
    fecha.addEventListener("change", function () {
        borrarError("fecha");
    });
    nombre.addEventListener("input", function () {
        borrarError("nombre-reserva");
    });
    email.addEventListener("input", function () {
        borrarError("email-reserva");
    });
    traslado.addEventListener("change", calcularTotal);
    fotos.addEventListener("change", calcularTotal);
    calcularTotal();

    formReserva.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let campos = ["paquete", "personas", "fecha", "nombre-reserva", "email-reserva"];
        for (let i = 0; i < campos.length; i++) {
            borrarError(campos[i]);
        }

        let errores = [];

        if (paquete.value == "") {
            mostrarError("paquete", "Elegí uno de los paquetes de la lista.");
            errores.push("paquete");
        }
        let cantidad = Number(personas.value);
        if (personas.value == "" || cantidad < 1 || cantidad > 15 || !Number.isInteger(cantidad)) {
            mostrarError("personas", "Poné un número entero entre 1 y 15.");
            errores.push("personas");
        }
        if (fecha.value == "") {
            mostrarError("fecha", "Elegí el día que querés ir.");
            errores.push("fecha");
        } else if (fecha.value < hoyTexto) {
            mostrarError("fecha", "Esa fecha ya pasó, elegí una de hoy en adelante.");
            errores.push("fecha");
        }
        if (!nombreValido(nombre.value.trim())) {
            mostrarError("nombre-reserva", "Escribí tu nombre y apellido, solo con letras (al menos 3).");
            errores.push("nombre-reserva");
        }
        if (!emailValido(email.value.trim())) {
            mostrarError("email-reserva", "Revisá el mail, tiene que ser como juan@gmail.com.");
            errores.push("email-reserva");
        }

        if (errores.length > 0) {
            errorGeneral.textContent = "Hay " + errores.length + " dato(s) para corregir. Están marcados en rojo.";
            errorGeneral.classList.remove("oculto");
            document.getElementById(errores[0]).focus();
            return;
        }
        errorGeneral.classList.add("oculto");

        let total = calcularTotal();
        let nombrePaquete = paquete.options[paquete.selectedIndex].text;
        let adicionales = "ninguno";
        if (traslado.checked && fotos.checked) {
            adicionales = "traslado y sesión de fotos";
        } else if (traslado.checked) {
            adicionales = "traslado";
        } else if (fotos.checked) {
            adicionales = "sesión de fotos";
        }

        let textoResumen = document.getElementById("texto-resumen");
        textoResumen.textContent = "";
        agregarDato(textoResumen, "Paquete", nombrePaquete);
        agregarDato(textoResumen, "Fecha", fechaLinda(fecha.value));
        agregarDato(textoResumen, "Personas", personas.value);
        agregarDato(textoResumen, "Precio por persona", document.getElementById("precio-unitario").textContent);
        agregarDato(textoResumen, "Subtotal", document.getElementById("subtotal").textContent);
        agregarDato(textoResumen, "Adicionales", adicionales);
        agregarDato(textoResumen, "Costo de adicionales", document.getElementById("extras").textContent);
        agregarDato(textoResumen, "Nombre", nombre.value.trim());
        agregarDato(textoResumen, "Email", email.value.trim());
        agregarDato(textoResumen, "Total", "$" + total.toLocaleString("es-AR") + " (pesos argentinos)");

        document.getElementById("mensaje-reserva").classList.add("oculto");
        document.getElementById("resumen").classList.remove("oculto");
        document.getElementById("resumen").scrollIntoView({ behavior: "smooth", block: "center" });
    });

    formReserva.addEventListener("input", function () {
        document.getElementById("resumen").classList.add("oculto");
    });

    document.getElementById("confirmar").addEventListener("click", function () {
        let mensaje = document.getElementById("mensaje-reserva");
        mensaje.textContent = "¡Listo, " + nombre.value + "! Tu reserva para el " + fechaLinda(fecha.value) +
            " quedó confirmada. Te mandamos los datos a " + email.value +
            ". (Es una simulación, no se cobra nada ni se manda ningún mail.)";
        document.getElementById("resumen").classList.add("oculto");
        mensaje.classList.remove("oculto");
        mensaje.scrollIntoView({ behavior: "smooth", block: "center" });
        formReserva.reset();
        calcularTotal();
    });

    document.getElementById("cancelar").addEventListener("click", function () {
        document.getElementById("resumen").classList.add("oculto");
        paquete.focus();
    });

    formReserva.addEventListener("reset", function () {
        let campos = ["paquete", "personas", "fecha", "nombre-reserva", "email-reserva"];
        for (let i = 0; i < campos.length; i++) {
            borrarError(campos[i]);
        }
        errorGeneral.classList.add("oculto");
        document.getElementById("resumen").classList.add("oculto");
        setTimeout(calcularTotal, 0);
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
        borrarError("mensaje");
    });
    nombre.addEventListener("input", function () {
        borrarError("nombre");
    });
    email.addEventListener("input", function () {
        borrarError("email");
    });
    motivo.addEventListener("change", function () {
        borrarError("motivo");
    });

    formContacto.addEventListener("submit", function (evento) {
        evento.preventDefault();
        enviado.classList.add("oculto");

        let campos = ["nombre", "email", "motivo", "mensaje"];
        for (let i = 0; i < campos.length; i++) {
            borrarError(campos[i]);
        }

        let errores = [];

        if (nombre.value.trim().length < 3) {
            mostrarError("nombre", "Escribí tu nombre (al menos 3 letras).");
            errores.push("nombre");
        }
        if (!emailValido(email.value.trim())) {
            mostrarError("email", "Revisá el mail, tiene que ser como juan@gmail.com.");
            errores.push("email");
        }
        if (motivo.value == "") {
            mostrarError("motivo", "Elegí el motivo de tu consulta.");
            errores.push("motivo");
        }
        if (mensaje.value.trim().length < 10) {
            mostrarError("mensaje", "Escribí un poco más, el mensaje tiene que tener al menos 10 caracteres.");
            errores.push("mensaje");
        }

        if (errores.length > 0) {
            errorGeneral.textContent = "Hay " + errores.length + " dato(s) para corregir. Están marcados en rojo.";
            errorGeneral.classList.remove("oculto");
            document.getElementById(errores[0]).focus();
            return;
        }

        errorGeneral.classList.add("oculto");
        enviado.textContent = "¡Gracias, " + nombre.value + "! Recibimos tu consulta y te vamos a responder a " +
            email.value + " en uno o dos días hábiles. (Es una simulación, no se envía.)";
        enviado.classList.remove("oculto");
        formContacto.reset();
        contador.textContent = "0";
    });

    formContacto.addEventListener("reset", function () {
        let campos = ["nombre", "email", "motivo", "mensaje"];
        for (let i = 0; i < campos.length; i++) {
            borrarError(campos[i]);
        }
        errorGeneral.classList.add("oculto");
        contador.textContent = "0";
    });
}

let cajaDias = document.getElementById("dias");

if (cajaDias) {
    let nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let nombresMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let cajaClima = document.getElementById("clima-dia");
    let pronostico = null;

    function describirClima(codigo) {
        if (codigo == 0) {
            return "Despejado";
        } else if (codigo <= 2) {
            return "Parcialmente nublado";
        } else if (codigo == 3) {
            return "Nublado";
        } else if (codigo == 45 || codigo == 48) {
            return "Niebla";
        } else if (codigo < 60) {
            return "Posible llovizna";
        } else if (codigo < 70) {
            return "Lluvia";
        } else if (codigo < 80) {
            return "Nieve";
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
            "<ul class='datos-clima'>" +
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

    fetch("https://api.open-meteo.com/v1/forecast?latitude=-37.11&longitude=-56.85" +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset" +
        "&timezone=America%2FArgentina%2FBuenos_Aires&forecast_days=7")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            pronostico = datos.daily;
            cajaDias.innerHTML = "";

            for (let i = 0; i < pronostico.time.length; i++) {
                let fecha = new Date(pronostico.time[i] + "T12:00");
                let texto = nombresDias[fecha.getDay()].slice(0, 3) + " " + fecha.getDate();
                if (i == 0) {
                    texto = "Hoy";
                } else if (i == 1) {
                    texto = "Mañana";
                }

                let boton = document.createElement("button");
                boton.type = "button";
                boton.className = "pestana dia font-semibold px-4 py-3 cursor-pointer text-base";
                boton.textContent = texto;
                boton.addEventListener("click", function () {
                    mostrarDia(i);
                });
                cajaDias.appendChild(boton);
            }

            mostrarDia(0);
        })
        .catch(function () {
            cajaDias.innerHTML = "<p class='error'>No pudimos cargar el pronóstico. Probá recargar la página en un rato.</p>";
        });
}
