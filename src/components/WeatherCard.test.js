import React from 'react';
import { render } from '@testing-library/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard Component', () => {
  const mockWeatherData = {
    name: 'Madrid',
    main: { temp: 20, pressure: 1000, humidity: 50 },
    weather: [{ main: 'Clear' }],
    wind: { speed: 10 }
  };

  test('should render weather information', () => {
    const { getByText } = render(<WeatherCard weatherData={mockWeatherData} />);
    expect(getByText('Clima Actual en: Madrid')).toBeInTheDocument();
    expect(getByText('20.0°C')).toBeInTheDocument();
    expect(getByText('Presión: 1000 hPa')).toBeInTheDocument();
  });
});
