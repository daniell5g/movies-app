import { fireEvent, render } from '@testing-library/react-native';
import type { Movie } from '@utils/interfaces';
import { ThemeProvider } from 'styled-components/native';

import { themes } from '../../../theme';
import { ItemMovieCardFavorite } from '../index';

describe('Component: ItemMovieCardFavorite', () => {
  const mockMovie = {
    id: 1,
    title: 'Filme do Batman',
    overview: 'Isso é a sinopse do filme do Batman.',
    poster_path: '/qkhZRqCWqJ376sBzD4MeAO2w4wv.jpg',
    backdrop_path: '/qkhZRqCWqJ376sBzD4MeAO2w4wv.jpg',
    runtime: 120,
    release_date: '2024-08-07',
    vote_average: 8.5,
    vote_count: 100,
    revenue: 50000000
  };

  it('generate snapshot', () => {
    const { toJSON } = render(
      <ThemeProvider theme={themes.default}>
        <ItemMovieCardFavorite info={mockMovie} />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  })

  it('should toggle favorite status when badge is pressed', () => {
    const mockAddFavorite = jest.fn();
    const mockRemoveFavorite = jest.fn();
    const mockFavoritesStore = {
      favorites: [],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    };

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('../../../store/favoritesStore'), 'useFavoritesStore').mockReturnValue(mockFavoritesStore);

    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <ItemMovieCardFavorite info={mockMovie} />
      </ThemeProvider>
    );

    const badge = getByTestId('badge');
    fireEvent.press(badge);

    if (mockFavoritesStore.favorites.some((movie: Movie) => movie.id === mockMovie.id)) {
      expect(mockRemoveFavorite).toHaveBeenCalledWith(mockMovie.id);
    } else {
      expect(mockAddFavorite).toHaveBeenCalledWith(mockMovie);
    }
  });
});