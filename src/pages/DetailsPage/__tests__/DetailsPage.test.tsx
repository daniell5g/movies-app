import { useMovieDetails } from '@hooks/useMovieDetails';
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { useFavoritesStore } from '../../../store/favoritesStore';
import { themes } from '../../../theme';
import { DetailsPage } from '../';
import { useDetailsPageViewModel } from '../viewModel';

jest.mock('../viewModel');
jest.mock('../../../store/favoritesStore');
jest.mock('@hooks/useNetworkStatus');
jest.mock('@hooks/useMovieDetails');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe('DetailsPage Tests', () => {
  const addFavoriteMock = jest.fn();
  const removeFavoriteMock = jest.fn();
  const navigateMock = jest.fn();
  const mockRoute = { params: { movieId: 1 } };

  const mockMovieDetails = {
    id: 1,
    title: 'Filme do Batman',
    overview: 'Isso é a sinopse do filme do Batman.',
    release_date: '2024-08-07',
    vote_average: 8.5,
    vote_count: 100,
    revenue: 50000000
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      isFavorite: false,
      favorites: [],
      addFavorite: addFavoriteMock,
      removeFavorite: removeFavoriteMock,
    });

    (useMovieDetails as jest.Mock).mockReturnValue({
      movieDetails: mockMovieDetails,
      loading: false,
      error: null,
    });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
    });

    (useRoute as jest.Mock).mockReturnValue(mockRoute);
  });

  it('should render loading indicator when loading is true', () => {
    (useDetailsPageViewModel as jest.Mock).mockReturnValue({
      loading: true,
      movieDetails: null,
      isFavorite: false,
      handleGoBack: jest.fn(),
      handleToggleFavorite: jest.fn(),
    });

    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <DetailsPage />
      </ThemeProvider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should render movie details when loading is false and movieDetails is available', () => {
    (useDetailsPageViewModel as jest.Mock).mockReturnValue({
      loading: false,
      movieDetails: mockMovieDetails,
      isFavorite: false,
      handleGoBack: jest.fn(),
      handleToggleFavorite: jest.fn(),
    });

    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <DetailsPage />
      </ThemeProvider>
    );

    expect(getByText('Filme do Batman')).toBeTruthy();
    expect(getByText('Isso é a sinopse do filme do Batman.')).toBeTruthy();
    expect(getByText('06/08/2024')).toBeTruthy(); // ?? Timezone
  });

  it('should navigate back to home page when back button is pressed', () => {
    const handleGoBackMock = jest.fn();

    (useDetailsPageViewModel as jest.Mock).mockReturnValue({
      loading: false,
      movieDetails: mockMovieDetails,
      isFavorite: false,
      handleGoBack: handleGoBackMock,
      handleToggleFavorite: jest.fn(),
    });

    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <DetailsPage />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId('back-button'));

    expect(handleGoBackMock).toHaveBeenCalled();
  });

  it('should navigate back to HomePage if there is no network connection', async () => {
    const handleGoBackMock = jest.fn();
    (useNetworkStatus as jest.Mock).mockReturnValue(false);
    (useDetailsPageViewModel as jest.Mock).mockReturnValue({
      loading: false,
      movieDetails: mockMovieDetails,
      isFavorite: false,
      handleGoBack: handleGoBackMock
    });

    render(
      <ThemeProvider theme={themes.default}>
        <DetailsPage />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(handleGoBackMock).toHaveBeenCalled();
    });
  });

  it('should toggle favorite status when favorite button is pressed', () => {
    const handleToggleFavoriteMock = jest.fn();

    (useDetailsPageViewModel as jest.Mock).mockReturnValue({
      loading: false,
      movieDetails: mockMovieDetails,
      isFavorite: false,
      handleGoBack: jest.fn(),
      handleToggleFavorite: handleToggleFavoriteMock,
    });

    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <DetailsPage />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId('favorite-button'));

    expect(handleToggleFavoriteMock).toHaveBeenCalled();
  });
});