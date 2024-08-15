import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { useFavoritesStore } from '../../../store/favoritesStore';
import { themes } from '../../../theme';
import { FavoritePage } from '../index';

jest.mock('@react-navigation/native');
jest.mock('../../../store/favoritesStore');

describe('FavoritePage Tests', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
    });

    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
    });
  });

  it('should render correctly with empty favorites', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <FavoritePage />
      </ThemeProvider>
    );

    expect(getByTestId('empty-component')).toBeTruthy();
    expect(getByText('Não há filmes favoritos')).toBeTruthy();
  });

  it('should navigate back to HomePage when back button is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <FavoritePage />
      </ThemeProvider>
    );

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(navigateMock).toHaveBeenCalledWith('HomePage');
  });

  it('should render favorite movies correctly', () => {
    const mockFavorites = [
      { id: 1, title: 'Filme do Batman' },
      { id: 2, title: 'BRQ - Expo 2024' },
    ];

    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: mockFavorites,
    });

    const { getAllByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <FavoritePage />
      </ThemeProvider>
    );

    const movieItems = getAllByTestId('container-item-movie-card-favorite');
    expect(movieItems.length).toBe(2);
  });
});
