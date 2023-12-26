import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  test('should render input field', () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    expect(getByPlaceholderText('Buscar ciudad...')).toBeInTheDocument();
  });

  test('should call onSearch when form is submitted', () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText, getByRole } = render(<SearchBar onSearch={mockOnSearch} />);
    fireEvent.change(getByPlaceholderText('Buscar ciudad...'), { target: { value: 'Madrid' } });
    fireEvent.submit(getByRole('button'));
    expect(mockOnSearch).toHaveBeenCalledWith('Madrid');
  });
});
