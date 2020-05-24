const COORDS_APIKEY = "3c307df8cc2e99d8df9172e2cf0c164d",
COORDS = "coords",
weather = document.querySelector(".js-weather");

function getWeather(longi, lati) { //API GET Method
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${COORDS_APIKEY}&units=metric`). 
    then(function(response) {
        return response.json();
    }).
    then(function(json) {
        const temperature = Math.floor(json.main.temp);
        weather.innerHTML = `${temperature}°C @ ${json.name}`
    });
}

function saveCoords(obj) { //Save coords into Local Storage
    localStorage.setItem(COORDS, JSON.stringify(obj));
}

function handleGeoSuccess(position) {
    const longi = position.coords.longitude;
    const lati = position.coords.latitude;
    
    const coordsObj = {
        longi: longi,
        lati: lati
    };
    
    saveCoords(coordsObj);
    getWeather(longi, lati);
}

function handleGeoError() {
    console.log("Can't access location.")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError, {timeout: 20000});
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    }
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.longi, parsedCoords.lati)
    }
}

function init() {
    loadCoords();
}
init();