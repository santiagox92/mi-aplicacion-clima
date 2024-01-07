import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from '../src/App';

describe('App Integration Tests', () => {
  test('fetches weather data from OpenWeather API', async () => {
    const { findByText } = render(<App />);

    // Ajusta los textos según cómo se muestren en tu aplicación
    const cityName = await findByText(/Nombre de la Ciudad/);
    expect(cityName).toBeInTheDocument();

    const temperature = await findByText(/°C/);
    expect(temperature).toBeInTheDocument();
  });

  test('fetches forecast data from OpenWeather API', async () => {
    const { findByText } = render(<App />);

    // Ajusta los textos según cómo se muestren en tu aplicación
    const forecastDate = await findByText(/Fecha del Pronóstico/);
    expect(forecastDate).toBeInTheDocument();

    const forecastTemperature = await findByText(/°C/);
    expect(forecastTemperature).toBeInTheDocument();
  });
});