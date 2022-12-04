// Feature 1
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// Feature 1

let dateTime = document.querySelector("#dateTime");
let now = new Date();
dateTime.innerHTML = formatDate(now);

// Feature 2 - user enters city name into search bar

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Feature 2 - Retrieve city name value from search bar input and apply this to weather api url. Display city name in app;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#autoSizingInput");
  let cityDisplay = document.querySelector("#city-name");
  cityDisplay.innerHTML = `${searchInput.value}`;
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let cityName = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

// Feature 3 - Displays temperature data and weather description for city value retrieved from 'search' function
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#dateTime");
  tempDisplay.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

// Feature 4 - when location button clicked triggers retrievePosition function
function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

// Feature 4 - If user clicks location button triggers function findLocation

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", findLocation);

// Feature 5 - sends lat and lon position to weather api and triggers ShowWeatherViaButton function
function retrievePosition(position) {
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeatherViaButton);
}

//Feature 6 - displays temperature and location name sent from retrievePosition function on the app
function showWeatherViaButton(response) {
  let temperatureViaButton = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureViaButton.innerHTML = `${temperature}`;
  let locationViaButton = document.querySelector("#city-name");
  locationViaButton.innerHTML = `${response.data.name}`;
}
