// src/components/ForecastCard.js

import React, { useState } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import './ForecastCard.css'; // Asegúrate de tener este archivo CSS

function ForecastCard({ forecastData }) {

  const [expandedDay, setExpandedDay] = useState(null);

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

  // Función para determinar el ícono del clima
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny size={50} />;
      case 'Clouds':
        return <WiCloudy size={50} />;
      case 'Rain':
        return <WiRain size={50} />;
      case 'Snow':
        return <WiSnow size={50} />;
      case 'Thunderstorm':
        return <WiThunderstorm size={50} />;
      case 'Fog':
        return <WiFog size={50} />;
      default:
        return <WiDaySunny size={50} />;
    }
  };

  // Función para procesar y agrupar los datos de pronóstico por día
  const processForecastData = (data) => {
    const dailyData = {};
    data.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          avgTemp: item.main.temp,
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
          hourly: [item]
        };
      } else {
        dailyData[date].minTemp = Math.min(dailyData[date].minTemp, item.main.temp_min);
        dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, item.main.temp_max);
        dailyData[date].avgTemp += item.main.temp;
        dailyData[date].hourly.push(item);
      }
    });

    return Object.keys(dailyData).map(date => ({
      date,
      ...dailyData[date],
      avgTemp: (dailyData[date].avgTemp / dailyData[date].hourly.length).toFixed(1)
    }));
  };

  const toggleDay = (date) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  const dailyForecast = forecastData ? processForecastData(forecastData.list) : [];

  return (
    <div className="forecast-container">
      {dailyForecast.map((day, index) => (
        <div key={index}>
          <div className="forecast-card" onClick={() => toggleDay(day.date)}>
            <div className="date-temp">
              <h5>{day.date}</h5>
              <p className="avg-temp">{day.avgTemp}°C</p>
            </div>
            {getWeatherIcon(day.condition)}
            <div className="temp-details">
              <p>Max: {day.maxTemp}°C</p>
              <p>Min: {day.minTemp}°C</p>
            </div>
          </div>
          {expandedDay === day.date && (
            <div className="hourly-forecast">
              {day.hourly.map((hour, idx) => (
                <div key={idx} className="hour-details">
                  <p className="hour-time">
                      {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  <p>Temp: {hour.main.temp.toFixed(1)}°C</p>
                  <p>Condición: {translateWeatherCondition(hour.weather[0].main)}</p>
                  {/* Otros detalles que desees agregar */}
                  {idx < day.hourly.length - 1 && <hr />}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ForecastCard;
