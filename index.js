// Exemple de code pour faire une requête API en utilisant la librairie 'request'
const request = require("request");

const API_KEY = "38f9264b8e345e5059d64b5e08c19663";
const BASE_URL =
  "http://api.openweathermap.org/data/2.5/weather?appid=" + API_KEY + "&q=";

function getWeatherData(city, callback) {
  const url = BASE_URL + city;
  request(url, function (error, response, body) {
  });
}

getWeatherData("Sousse", (error, weatherData) => {
  if (!error) {
    console.log("Description: " + weatherData.weather[0].description);
    console.log("Température: " + weatherData.main.temp + "C");
    console.log("Humidité: " + weatherData.main.humidity + "%");
  }
})
