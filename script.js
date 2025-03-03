const weatherForm = document.querySelector(".head");
const cityInput = document.querySelector(".city");
const card = document.querySelector(".content");

const apikey = "61265f77c8cae794363bfc75b8b92b0a";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      displayError(error.message);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiurl);
  if (!response.ok) {
    throw new Error("Could not fetch data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    wind: { speed },
    weather: [{ description, id }],
  } = data;

  card.innerHTML = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  cityDisplay.textContent = city;
  cityDisplay.classList.add("citydisplay");

  const tempDisplay = document.createElement("p");
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  tempDisplay.classList.add("tempdisplay");

  const humidityDisplay = document.createElement("p");
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("humiditydisplay");

  const speedDisplay = document.createElement("p");
  speedDisplay.textContent = `Wind Speed: ${speed} km/h`;
  speedDisplay.classList.add("speeddisplay");

  const descDisplay = document.createElement("p");
  descDisplay.textContent = description;
  descDisplay.classList.add("descdisplay");

  const weatherEmoji = document.createElement("p");
  weatherEmoji.textContent = getWeatherEmoji(id);
  weatherEmoji.classList.add("weatheremoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(speedDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherid) {
  if (weatherid >= 200 && weatherid < 300) return "⛈️";
  if (weatherid >= 300 && weatherid < 400) return "🌧️";
  if (weatherid >= 500 && weatherid < 600) return "🌦️";
  if (weatherid >= 600 && weatherid < 700) return "❄️";
  if (weatherid >= 700 && weatherid < 800) return "💨";
  if (weatherid === 800) return "☀️";
  if (weatherid >= 801 && weatherid < 810) return "☁️";
  return "❓";
}

function displayError(message) {
  card.innerHTML = "";
  card.style.display = "flex";
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errordisplay");
  card.appendChild(errorDisplay);
}
