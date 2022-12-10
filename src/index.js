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

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row detailed-weather">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col">
              <div class="card text-center bg-transparent border border-0">
                <div
                  class="card-header bg-transparent border border-0 day"
                  id="forecast-day"
                >${day}
                </div>
                <div class="card-body">
                  <img src="assets/static/few clouds.png"
                  alt="clouds"
                  width=50
                  />
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item bg-transparent forecast">
                    <span id="forecast-min">7</span>° |
                    <span id="forecast-max">13</span>° <br /><span
                      id="forecast-description"
                      >Rainy</span
                    >
                  </li>
                </ul>
              </div>
            </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Feature 3 - Displays temperature data and weather description for city value retrieved from 'search' function
function showWeather(response) {
  let tempElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  tempElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `assets/animated/${response.data.weather[0].description}.gif`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// Feature 4 - when location button clicked triggers retrievePosition function
function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

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
  let locationViaButton = document.querySelector("#city-name");
  let descriptionViaButton = document.querySelector("#weatherDescription");
  let humidityViaButton = document.querySelector("#humidity");
  let windViaButton = document.querySelector("#wind");
  let iconViaButton = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  temperatureViaButton.innerHTML = Math.round(celsiusTemperature);
  locationViaButton.innerHTML = `${response.data.name}`;
  descriptionViaButton.innerHTML = response.data.weather[0].description;
  humidityViaButton.innerHTML = response.data.main.humidity;
  windViaButton.innerHTML = Math.round(response.data.wind.speed);
  iconViaButton.setAttribute(
    "src",
    `assets/animated/${response.data.weather[0].description}.gif`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function search(city) {
  let cityDisplay = document.querySelector("#city-name");
  cityDisplay.innerHTML = city;
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let cityName = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#autoSizingInput");
  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let dateTime = document.querySelector("#dateTime");
let timestamp = new Date();
dateTime.innerHTML = formatDate(timestamp);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", findLocation);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("London");
displayForecast();
