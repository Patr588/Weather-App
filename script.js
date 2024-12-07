const API_KEY = '4d5d46c8a6aa4fee30c9275ddf397241'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherCard = document.querySelector('.weather-card');
    weatherCard.classList.remove('hidden');

    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h

    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}); 