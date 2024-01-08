// src/components/WeatherCard.js
import './WeatherCard.css'; // En WeatherCard.js
import React from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiWindy } from 'react-icons/wi';

function WeatherCard({ weatherData }) {
  // Traduce las condiciones del clima al español
  const translateWeatherCondition = (condition) => {
    const conditionsInSpanish = {
      'Clear': 'Despejado',
      'Rain': 'Lluvia',
      'Clouds': 'Nublado',
      'Snow': 'Nieve',
      'Thunderstorm': 'Tormenta',
      'Wind': 'Viento',
      // Agrega más condiciones y sus traducciones según sea necesario
    };

    return conditionsInSpanish[condition] || condition;
  };

  // Determina el ícono del clima
  const getWeatherIcon = (weatherCondition) => {
    const iconSize = 50; // Tamaño de los íconos

    const iconMapping = {
      'Clear': <WiDaySunny size={iconSize} />,
      'Rain': <WiRain size={iconSize} />,
      'Clouds': <WiCloudy size={iconSize} />,
      'Snow': <WiSnow size={iconSize} />,
      'Thunderstorm': <WiThunderstorm size={iconSize} />,
      'Wind': <WiWindy size={iconSize} />,
      // Agrega más condiciones y sus íconos si es necesario
    };

    return iconMapping[weatherCondition] || <WiDaySunny size={iconSize} />;
  };

  return (
    <div className="weather-card">
      <h2>Clima Actual en: <strong>{weatherData.name}</strong></h2>
      <div className="weather-info">
        {getWeatherIcon(weatherData.weather[0].main)}
        <div>
          <p className="temperature">{weatherData.main.temp.toFixed(1)}°C</p>
          <p className="condition">{translateWeatherCondition(weatherData.weather[0].main)}</p>
          <p>Presión: {weatherData.main.pressure} hPa</p>
          <p>Humedad: {weatherData.main.humidity}%</p>
          <p>Viento: {weatherData.wind.speed} m/s</p>
          {/* La probabilidad de lluvia puede no estar siempre disponible */}
          {weatherData.rain ? <p>Lluvia: {weatherData.rain['1h']} mm</p> : null}
        </div>
      </div>
    </div>
    
  );
}

export default WeatherCard;
