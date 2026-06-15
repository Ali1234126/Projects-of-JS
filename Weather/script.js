let city = document.getElementById("city");
let search = document.getElementById("search");
let name = document.getElementById("name");
let temp = document.getElementById("temp");
let description = document.getElementById("description");
let ico = document.getElementById("ico");
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
    name.innerHTML = "Loading...";
    let response = await fetch(`https://wttr.in/${result}?format=j1`);

    let data = await response.json();

    if (response.ok) {
      name.innerHTML = result;

      temp.innerHTML = `${data.current_condition[0].temp_C}°C`;

      description.innerHTML = data.current_condition[0].weatherDesc[0].value;

      ico.src = data.current_condition[0].weatherIconUrl[0].value;
    } else {
      clearData();
      error.innerHTML = "Failed to load weather data";
    }
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
  ico.src = "";
}
