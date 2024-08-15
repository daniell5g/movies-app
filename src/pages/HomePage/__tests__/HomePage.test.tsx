import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { useNavigation } from '@react-navigation/native';
import { renderHook } from '@testing-library/react-hooks';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { themes } from '../../../theme';
import { HomePage } from '../index';
import { useHomeViewModel } from '../viewModel';

jest.mock('@react-navigation/native');
jest.mock('../viewModel');
jest.mock('@hooks/useNetworkStatus');
jest.mock('../../../services/axios/api');

describe('HomePage Tests', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    jest.spyOn(console, 'warn').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: navigateMock,
    });

    (useHomeViewModel as jest.Mock).mockReturnValue({
      error: '',
      movies: [],
      loading: false,
      noResult: false,
      search: '',
      searchLoading: false,
      handleSearchMovies: jest.fn(),
      loadMoreMovies: jest.fn(),
      handleNavigatitonToDetailsPage: navigateMock,
    });
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should display "BRQ Movies" and "Qual o filme está buscando?" texts', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    expect(getByText('BRQ Movies')).toBeTruthy();
    expect(getByText('Qual o filme está buscando?')).toBeTruthy();
  });

  it('should display a search input with placeholder "Busque seu filme aqui..."', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeTruthy();
    expect(searchInput.props.placeholder).toBe('Busque seu filme aqui...');
  });

  it('should display a banner with "Sem conexão com a internet" when there is no connection', () => {
    (useNetworkStatus as jest.Mock).mockReturnValue(false);

    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    const alertBanner = getByTestId('alert-banner-text');
    expect(alertBanner).toBeTruthy();
    expect(getByText('Sem conexão com a internet')).toBeTruthy();
  });

  it('should render the initial screen with loading state', () => {
    (useHomeViewModel as jest.Mock).mockReturnValue({
      error: '',
      movies: [],
      loading: true,
      noResult: false,
      search: '',
      searchLoading: false,
      handleSearchMovies: jest.fn(),
      loadMoreMovies: jest.fn(),
      handleNavigatitonToDetailsPage: navigateMock,
    });

    (useNetworkStatus as jest.Mock).mockReturnValue(true);
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy()
  });

  it('should display "Nenhum filme encontrado" when search returns no results after typing in the search input', async () => {
    const handleSearchMoviesMock = jest.fn();

    (useHomeViewModel as jest.Mock).mockReturnValue({
      error: '',
      movies: [],
      loading: false,
      noResult: false,
      search: '',
      searchLoading: false,
      handleSearchMovies: handleSearchMoviesMock,
      loadMoreMovies: jest.fn(),
      handleNavigatitonToDetailsPage: navigateMock,
    });

    (useNetworkStatus as jest.Mock).mockReturnValue(true);

    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    await act(async () => {
      const searchInput = getByTestId('search-input');
      fireEvent.changeText(searchInput, 'test');
    });

    expect(handleSearchMoviesMock).toHaveBeenCalledWith('test');

    (useHomeViewModel as jest.Mock).mockReturnValue({
      error: '',
      movies: [],
      loading: false,
      noResult: true,
      search: 'test',
      searchLoading: false,
      handleSearchMovies: handleSearchMoviesMock,
      loadMoreMovies: jest.fn(),
      handleNavigatitonToDetailsPage: navigateMock,
    });

    await waitFor(() => {
      const text = getByTestId('search-input');
      expect(text).toBeTruthy();
    });
  });

  it('should navigate to the details page when a movie card is pressed', () => {
    (useHomeViewModel as jest.Mock).mockReturnValue({
      error: '',
      movies: [{ id: 1, title: 'Filme do Batman', poster_path: '/38723n-232323-hjh323.jpg', vote_average: 8 }],
      loading: false,
      noResult: false,
      search: '',
      searchLoading: false,
      handleSearchMovies: jest.fn(),
      loadMoreMovies: jest.fn(),
      handleNavigatitonToDetailsPage: navigateMock,
    });

    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    const movieCard = getByTestId('container-item-movie-card');

    fireEvent.press(movieCard);

    expect(navigateMock).toHaveBeenCalledWith(1);
  });

  it('should display an error banner when there is an error and the device is connected', () => {
    (useHomeViewModel as jest.Mock).mockReturnValue({
      error: 'Erro ao carregar filmes',
      movies: [],
      loading: false,
      noResult: false,
      search: '',
      searchLoading: false,
      handleSearchMovies: jest.fn(),
      loadMoreMovies: jest.fn(),
      handleNavigatitonToDetailsPage: navigateMock,
    });

    (useNetworkStatus as jest.Mock).mockReturnValue(true);

    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    expect(getByText('Erro ao carregar filmes')).toBeTruthy();
  });

  it('should navigate to the favorites page when the heart icon is pressed', () => {
    (useHomeViewModel as jest.Mock).mockReturnValue({
      error: '',
      movies: [],
      loading: false,
      noResult: false,
      search: '',
      searchLoading: false,
      handleSearchMovies: jest.fn(),
      loadMoreMovies: jest.fn(),
      handleNavigatitonToDetailsPage: navigateMock,
    });

    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId('favorite-button'));

    expect(navigateMock).toHaveBeenCalled();
  });

  it('should navigate to details page with correct movie id', () => {
    const { result } = renderHook(() => useHomeViewModel());

    act(() => {
      result.current.handleNavigatitonToDetailsPage(123);
    });

    expect(navigateMock).toHaveBeenCalledWith(123);
  });

  it('should navigate to favorites page', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    const favoriteButton = getByTestId('favorite-button');
    fireEvent.press(favoriteButton);
    expect(navigateMock).toHaveBeenCalledWith('FavoritePage');
  });

  it('should navigate to settings page', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <HomePage />
      </ThemeProvider>
    );

    const settingButton = getByTestId('settings-button');
    fireEvent.press(settingButton);
    expect(navigateMock).toHaveBeenCalledWith('SettingsPage');
  });
});
