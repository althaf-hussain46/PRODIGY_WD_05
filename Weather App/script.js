document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '96d368be0f77d6d0a0bfe70478e59593';  // Replace with your actual API key
    const weatherContainer = document.getElementById('weather-container');
    const weatherLocation = document.getElementById('weather-location');
    const weatherDescription = document.getElementById('weather-description');
    const weatherTemperature = document.getElementById('weather-temperature');
    const weatherHumidity = document.getElementById('weather-humidity');
    const weatherWind = document.getElementById('weather-wind');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const locationInput = document.getElementById('location-input');

    getWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    });

    function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        console.log('Fetching weather data from URL:', url);  // Log the URL

        fetch(url)
            .then(response => {
                if (response.status === 401) {
                    throw new Error('Unauthorized: Invalid API key');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);  // Log response data
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    alert('Location not found');
                }
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
            });
    }

    function displayWeather(data) {
        const { name, sys, weather, main, wind } = data;
        if (!sys || !weather || !main || !wind) {
            throw new Error('Incomplete data received from API');
        }

        weatherLocation.textContent = `${name}, ${sys.country}`;
        weatherDescription.textContent = `Weather: ${weather[0].description}`;
        weatherTemperature.textContent = `Temperature: ${main.temp} °C`;
        weatherHumidity.textContent = `Humidity: ${main.humidity}%`;
        weatherWind.textContent = `Wind Speed: ${wind.speed} m/s`;
    }

    // Optionally, fetch weather based on user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            console.log('Fetching weather data from URL:', url);  // Log the URL

            fetch(url)
                .then(response => {
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Invalid API key');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Response data:', data);  // Log response data
                    displayWeather(data);
                })
                .catch(error => console.error('Error fetching the weather data:', error));
        });
    }
});
