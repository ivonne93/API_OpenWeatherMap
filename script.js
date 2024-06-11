//Capturar los elementos del DOM, para modificarlos posteriormente
let container = document.getElementById("container");
let searchForm = document.getElementById("search_submit");
let searchInput = document.getElementById("search_input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");
const apiKey = '6b9dab60d2de577328471513e44f5d5e'; // clave API

//Declarar funciones secundarias
const displayBackgroundImage = (obj) => {
    //Extraes la hora del obj que contine los datos del tiempo, con 1000 lo convertimos
    let dataSpanih = new Date(obj.dt * 1000).toLocaleString("es-ES", {
        timeStyle: "short",
        dateStyle: "long"
    });
    console.log(dataSpanih);

    date.textContent = `Actulización ${dataSpanih}`  //para ver la hora

    //extraer la hora de la fecha de arriba
    const dayHour = new Date(obj.dt * 1000).getHours();
    console.log(dayHour);
    //logica
    if (dayHour > 7 && dayHour < 18) {
        container.classList.remove("night");
        container.classList.add("day");
    } else {
        container.classList.remove("day");
        container.classList.add("night")
    }

}

const displayData = (obj) => {
    console.log(obj)
    temperatureDegrees.textContent = Math.floor(obj.main.temp);//temperatura
    timeZone.textContent = obj.name;//zona
    const icon = obj.weather[0].icon;
    weatherIcon.innerHTML = `<img src='iconos/${icon}.png'></img>`;
    min.textContent = Math.floor(obj.main.temp_min);
    max.textContent = Math.floor(obj.main.temp_max);
    temperatureDescription.textContent = obj.weather[0].description.charAt(0).toUpperCase() +
        obj.weather[0].description.slice(1);


}



//Declarar getWeatherData
const getWeatherData = async (city) => {
    //hacer un request  a la api Y obtener un objeto que ocntenga los datos
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`)
    const data = await res.json();

    //Cambiar el fondo de pantalla según sea dia o noche
    displayBackgroundImage(data);
    //mostrar los datos en pantalla
    displayData(data);

}


searchForm.addEventListener("submit", e => {
    e.preventDefault();//evitar que se envie el formulario
    getWeatherData(searchInput.value)
})

//Al cargar la página, inmediatamente nos cargue una ciudad
window.onload = () => {
    getWeatherData("Mexico");
}

