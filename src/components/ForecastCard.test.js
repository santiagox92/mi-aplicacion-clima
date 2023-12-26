import React from 'react';
import { render, fireEvent, getAllByText } from '@testing-library/react';
import ForecastCard from './ForecastCard';

// Datos simulados para las pruebas
const mockForecastData = {
  list: [
    {
      dt: 1651250400, // Fecha en formato timestamp
      main: { temp_min: 10, temp_max: 15, temp: 12 },
      weather: [{ main: 'Clear', icon: '01d' }],
    },
    {
      dt: 1651336800,
      main: { temp_min: 9, temp_max: 14, temp: 11.5 },
      weather: [{ main: 'Clouds', icon: '02d' }],
    },
    // Agrega más datos simulados según sea necesario
  ],
};

describe('ForecastCard Component', () => {
  test('should render forecast for each day', () => {
    const { getAllByText } = render(<ForecastCard forecastData={mockForecastData} />);
    expect(getAllByText(/°C/).length).toBeGreaterThanOrEqual(2); // Verifica que haya temperaturas para al menos dos días
  });

  test('should display correct weather condition after clicking a day', async () => {
    const { getByText, findByText } = render(<ForecastCard forecastData={mockForecastData} />);
  
    const dateElement = getByText('29/4/2022');
    fireEvent.click(dateElement);
  
    const despejadoElement = await findByText(/Despejado/);
    expect(despejadoElement).toBeInTheDocument();
  });

});

export default ForecastCard;
