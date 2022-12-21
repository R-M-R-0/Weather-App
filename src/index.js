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

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecastCoords(response) {
  console.log(response);
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row detailed-weather">`;
  let forecastElement = document.querySelector("#weather-forecast");

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
              <div class="card text-center bg-transparent border border-0">
                <div
                  class="card-header bg-transparent border border-0 day"
                  id="forecast-day"
                >${formatTimestamp(forecastDay.time)}
                </div>
                <div class="card-body">
                  <img src="assets/static/${
                    forecastDay.condition.description
                  }.png"
                  alt="${forecastDay.condition.description}"
                  width=50
                  />
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item bg-transparent forecast">
                    <span class="forecast-max" id="forecast-max">${Math.round(
                      forecastDay.temperature.maximum
                    )}</span>° |
                    <span forecast-minid="forecast-min">${Math.round(
                      forecastDay.temperature.minimum
                    )}</span>° 
                  </li>
                </ul>
              </div>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayForecastCity(response) {
  console.log(response);
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row detailed-weather">`;
  let forecastElement = document.querySelector("#weather-forecast");

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
              <div class="card text-center bg-transparent border border-0">
                <div
                  class="card-header bg-transparent border border-0 day"
                  id="forecast-day"
                >${formatTimestamp(forecastDay.time)}
                </div>
                <div class="card-body">
                  <img src="assets/static/${
                    forecastDay.condition.description
                  }.png"
                  alt="${forecastDay.condition.description}"
                  width=50
                  />
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item bg-transparent forecast">
                    <span id="forecast-max">${Math.round(
                      forecastDay.temperature.maximum
                    )}</span>° |
                    <span id="forecast-min">${Math.round(
                      forecastDay.temperature.minimum
                    )}</span>° 
                  </li>
                </ul>
              </div>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecastCity(response) {
  let apiKey = "0f1t2c0aa4b32b47bf8356ao93bfbc5b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${response.city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecastCity);
}

function getForecastCoords(response) {
  let apiKey = "0f1t2c0aa4b32b47bf8356ao93bfbc5b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${response.longitude}&lat=${response.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecastCoords);
}

function showWeather(response) {
  let tempElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.temperature.current);

  tempElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `assets/animated/${response.data.condition.description}.gif`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecastCity(response.data);
}

function retrievePosition(position) {
  let apiKey = "0f1t2c0aa4b32b47bf8356ao93bfbc5b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeatherViaButton);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showWeatherViaButton(response) {
  let temperatureViaButton = document.querySelector("#temperature");
  let locationViaButton = document.querySelector("#city-name");
  let descriptionViaButton = document.querySelector("#weatherDescription");
  let humidityViaButton = document.querySelector("#humidity");
  let windViaButton = document.querySelector("#wind");
  let iconViaButton = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.temperature.current);

  temperatureViaButton.innerHTML = Math.round(celsiusTemperature);
  locationViaButton.innerHTML = response.data.city;
  descriptionViaButton.innerHTML = response.data.condition.description;
  humidityViaButton.innerHTML = response.data.temperature.humidity;
  windViaButton.innerHTML = Math.round(response.data.wind.speed);
  iconViaButton.setAttribute(
    "src",
    `assets/animated/${response.data.condition.description}.gif`
  );
  iconViaButton.setAttribute("alt", response.data.condition.description);

  getForecastCoords(response);
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
  let apiKey = "0f1t2c0aa4b32b47bf8356ao93bfbc5b";
  let cityName = city;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
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
