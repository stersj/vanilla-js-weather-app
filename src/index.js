// Feature 1
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let current = document.querySelector("#time-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let dateNow = now.getDate();
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let monthNow = months[now.getMonth()];
if (hours < 10) {
  hours = "0" + hours;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}

current.innerHTML = `${day}, ${dateNow} ${monthNow}, ${hours}:${minutes}`;

//Update current city and temperature

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${temp}`;

  let weather = document.querySelector("#weather-condition");
  weather.innerHTML = response.data.weather[0].main;
  let feelsLike = document.querySelector("#feels");
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputcity");
  let city = `${searchInput.value}`;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = city;
  if (searchInput.value) {
    currentCity.innerHTML = city;
  } else {
    alert("Enter a city...😎");
    currentCity.innerHTML = null;
  }
  let apiKey = `e8afed4d9a3d0f7582b3f63e5e950faf`;
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${api}&appid=${apiKey}`).then(showWeather);
}

let form = document.querySelector("#search-button");
form.addEventListener("click", searchCity);

function getPosition(position) {
  console.log(position);
  let apiKey = `e8afed4d9a3d0f7582b3f63e5e950faf`;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${api}&appid=${apiKey}`).then(showWeather);
}
let button = document.querySelector("#current-button");
button.addEventListener("click", showWeather);

navigator.geolocation.getCurrentPosition(getPosition);