# Pina Experience: un día perfecto en Pinamar

Sitio web de la Actividad 3 de Diseño y Desarrollo Web (Grupo 7). Es el desarrollo del recorrido que diseñamos en la Actividad 2.

## Nombre y objetivo del sitio

**Nombre:** Pina Experience

**Objetivo:** proponer a familias y jóvenes un recorrido de un día completo por Pinamar que combine naturaleza, aventura y vida nocturna. El sitio les da la información práctica de cada parada (ubicación, duración, actividades y recomendaciones) para que puedan organizar su visita de forma simple y segura, y les permite reservar el recorrido.

## Tema y categoría del recorrido

- **Categoría:** recorridos por localidades del interior del país.
- **Ubicación:** Pinamar, provincia de Buenos Aires (Costa Atlántica, a unos 340 km de la Ciudad de Buenos Aires).
- **Tema:** "Un día perfecto en Pinamar". El recorrido sigue el paso de las horas, y cada momento del día es una parada:
  1. **Mañana:** mar y surf.
  2. **Mediodía:** gastronomía costera y médanos de La Frontera.
  3. **Atardecer:** bosques de Pinamar.
  4. **Noche:** Av. Bunge y la noche pinamarense.

## Público destinatario

Familias con chicos y grupos de jóvenes de 16 a 30 años que visitan Pinamar en temporada o en una escapada de fin de semana, sobre todo quienes van por primera vez. Por eso cada parada tiene una versión "En familia" y otra "Con amigos".

## Funcionalidades principales

- **Inicio** con la presentación del recorrido, un poco de historia de Pinamar, las 4 paradas, cómo organizar el día, información para antes de viajar, preguntas frecuentes, el clima y el formulario de reserva.
- **Una página por parada** con su historia, qué hacer, horarios, qué llevar, cómo llegar y un mapa con la ubicación.
- **Menú de navegación** que en el celular se convierte en un menú hamburguesa.
- **Pestañas "En familia" / "Con amigos"** que cambian las actividades recomendadas en cada parada.
- **Mapas interactivos** con la ubicación de cada parada.
- **Pronóstico del clima** de los próximos 7 días: se elige un día y muestra el estado, la temperatura máxima y mínima, la probabilidad de lluvia, el viento y la hora de salida y puesta del sol.
- **Formulario de reserva** con validaciones campo por campo (nombre, email, teléfono, fecha, cantidad de personas), mensajes de error abajo de cada campo y cálculo automático del total según el paquete y la cantidad de personas. Los precios están en pesos argentinos.
- **Formulario de consulta** en la sección de ayuda, con contador de caracteres.
- **Diseño responsive** que se adapta a celular, tablet y computadora.

## Tecnologías utilizadas

- **HTML5** para la estructura de las 5 páginas.
- **CSS3** con variables, flexbox y grid. Está hecho mobile first, con un solo media query (`min-width: 768px`).
- **Tailwind CSS 3.4.16** (por CDN) para algunas clases de utilidad, botones y el menú hamburguesa.
- **JavaScript** sin librerías extra para los formularios, las validaciones, el cálculo del total, las pestañas y el clima.
- **Leaflet 1.9.4** para los mapas.
- **Google Fonts** para las tipografías Archivo y Caveat.

## Estructura general del proyecto

```
act 3 final/
├── index.html        Inicio: presentación, paradas, clima, reserva y ayuda
├── manana.html       Parada 1: Mañana
├── mediodia.html     Parada 2: Mediodía
├── atardecer.html    Parada 3: Atardecer
├── noche.html        Parada 4: Noche
├── css/
│   └── style.css     Estilos propios del sitio
├── js/
│   └── script.js     Menú, pestañas, mapas, clima y formularios
└── img/              Logo y fotos de Pinamar
```

## Instrucciones para ejecutar o consultar el sitio

**Online:** entrar al enlace del sitio desplegado (más abajo).

**En la computadora:**

1. Descargar o clonar el repositorio.
2. Abrir `index.html` con cualquier navegador (Chrome, Firefox, Edge o Safari).
3. Para que carguen los mapas, las fuentes, Tailwind y el clima hace falta conexión a internet.

No hace falta instalar nada ni usar un servidor.

## API y servicios externos integrados

- **Open-Meteo** (https://open-meteo.com): API gratuita y sin clave que usamos para el pronóstico del clima de Pinamar. Se consulta con `fetch` y la respuesta llega en JSON.
- **Leaflet** (https://leafletjs.com): librería para los mapas interactivos.
- **Esri World Street Map**: proveedor de las imágenes de los mapas.
- **Tailwind CSS** por CDN.
- **Google Fonts** (Archivo y Caveat).

## Enlace al sitio desplegado

https://ivanwaj.github.io/PinaExperience/

## Enlaces al prototipo y al Design System

- **Prototipo (Google Stitch):** https://stitch.withgoogle.com/projects/15017342481330939416
- **Design System y documento de diseño (Actividad 2):** https://ivanwaj.github.io/Actividad02PinaExperience/
- **Repositorio de la Actividad 2:** https://github.com/ivanwaj/Actividad02PinaExperience

## Integrantes y contribuciones

| Integrante | Contribución |
|---|---|
| Iván Wajnszyld | Parada 1, Mañana: contenido, fotos y mapa de la página `manana.html`. |
| Luciano Joaquín Chávez | Parada 2, Mediodía: contenido, fotos y mapa de la página `mediodia.html`. |
| Joaquín Goñi | Parada 3, Atardecer: contenido, fotos y mapa de la página `atardecer.html`. |
| Joaquín Marletto | Parada 4, Noche: contenido, fotos y mapa de la página `noche.html`. |

Entre todos armamos la página de inicio, los estilos generales, los formularios de reserva y consulta, la integración del clima y el Documento 2 de desarrollo e implementación.


