import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (city) => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(weatherUrl)
      .then(response => {
        setWeatherData(response.data);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setWeatherData(null);
      });

    axios.get(forecastUrl)
      .then(response => {
        setForecastData(response.data);
      })
      .catch(err => {
        // Manejar errores del pronóstico aquí si es necesario
      });
  };

  return (
    <div className="App">
      <h1 className="AppTitle">Weather App Prueba Cambio</h1> {}
      <SearchBar onSearch={handleSearch} />
      {error && <div>Error al obtener los datos del clima.</div>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {forecastData && <ForecastCard forecastData={forecastData} />}
    </div>
  );
}

export default App;
