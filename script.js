
const inputCiudad = document.querySelector("#input-ciudad");
const botonBuscar = document.querySelector("#btn-buscar");

const nombreCiudad = document.querySelector("#nombre-ciudad");
const imagenClima = document.querySelector("#imagen-clima");
const condicion = document.querySelector("#condicion");
const temperatura = document.querySelector("#temperatura");
const humedad = document.querySelector("#humedad");
const viento = document.querySelector("#viento");

// PEGA TU API KEY ENTRE LAS COMILLAS
const claveApi = "295755ccf1e54cbba3912447262809";

const idioma = "es";

async function buscarClima() {

    const ciudad = inputCiudad.value.trim();

    if (ciudad === "") {
        alert("Escribe una ciudad.");
        return;
    }

    const apiClimaActual =
        `https://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

    try {

        const respuesta = await fetch(apiClimaActual);

        if (!respuesta.ok) {
            throw new Error("No se encontró la ciudad.");
        }

        const data = await respuesta.json();

        mostrarClima(data);

    } catch (error) {

        alert("No se pudo obtener el clima. Verifica la ciudad.");

        console.error(error);
    }
}

function mostrarClima(data) {

    nombreCiudad.textContent =
        `${data.location.name}, ${data.location.country}`;

    imagenClima.src =
        "https:" + data.current.condition.icon;

    imagenClima.alt =
        data.current.condition.text;

    condicion.textContent =
        data.current.condition.text;

    temperatura.textContent =
        data.current.temp_c;

    humedad.textContent =
        data.current.humidity;

    viento.textContent =
        data.current.wind_kph;
}
botonBuscar.addEventListener("click", buscarClima);
