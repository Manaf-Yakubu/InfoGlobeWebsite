const apiKey = 'b8b59bb765519893936365b4acabbb08'; // Your OpenWeatherMap API key

function saveAndFetchWeather() {
  const name = document.getElementById('nameInput').value.trim();
  const city = document.getElementById('cityInput').value.trim();

  if (!name || !city) {
    alert('Please enter both name and city.');
    return;
  }

  localStorage.setItem('weatherUser', name);
  localStorage.setItem('weatherCity', city);
  showGreeting(name);
  fetchWeather(city);
}

function showGreeting(name) {
  document.getElementById('formSection').style.display = 'none';
  document.getElementById('greetingSection').style.display = 'block';
  document.getElementById('greeting').textContent = `Hello, ${name}! Here's the weather:`;
}

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const weatherInfo = document.getElementById('weatherInfo');
      if (data.cod === 200) {
        weatherInfo.innerHTML = `
          <div class="weather-box">
            <h3>${data.name}</h3>
            <p><strong>Condition:</strong> ${data.weather[0].main}</p>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
          </div>
        `;
      } else {
        weatherInfo.innerHTML = `<div class="weather-box">City not found.</div>`;
      }
    })
    .catch(() => {
      document.getElementById('weatherInfo').innerHTML = `<div class="weather-box">Error fetching weather.</div>`;
    });
}

function resetUser() {
  localStorage.removeItem('weatherUser');
  localStorage.removeItem('weatherCity');
  location.reload();
}

window.onload = function () {
  const savedName = localStorage.getItem('weatherUser');
  const savedCity = localStorage.getItem('weatherCity');
  if (savedName && savedCity) {
    showGreeting(savedName);
    fetchWeather(savedCity);
  }
};
