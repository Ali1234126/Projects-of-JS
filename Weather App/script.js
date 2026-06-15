let city = document.getElementById("city");
let search = document.getElementById("search");
let name = document.getElementById("name");
let temp = document.getElementById("temp");
let description = document.getElementById("description");
let ico = document.getElementById("ico");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let feels = document.getElementById("feels");
let error = document.getElementById("error");

search.addEventListener("click", getWeather);
city.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  let result = city.value.trim();

  error.innerHTML = "";

  if (result === "") {
    clearData();
    error.innerHTML = "Please enter a city name";

    return;
  }

  try {
    clearData();
    name.innerHTML = "Loading...";
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=bbdc67c43d6b45a6aa4140106261506 &q=${result}`,
    );

    let data = await response.json();

    if (data.error) {
      clearData();
      error.innerHTML = "City not found";
      return;
    }

    name.innerHTML = `${data.location.name},${data.location.country}`;
    temp.innerHTML = `${data.current.temp_c}°C`;
    description.innerHTML = data.current.condition.text;
    ico.src = data.current.condition.icon;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;

    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;

    feels.innerHTML = `Feels Like: ${data.current.feelslike_c}°C`;
  } catch (err) {
    clearData();
    error.innerHTML = "Something went wrong";
    console.log(err);
  }
}
function clearData() {
  name.innerHTML = "";
  temp.innerHTML = "";
  description.innerHTML = "";
  humidity.innerHTML = "";
  wind.innerHTML = "";
  feels.innerHTML = "";
  ico.src = "";
}
