import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { themes } from '../../../theme';
import { ItemMovieCard } from '../index';

describe('Component: ItemMovieCard', () => {
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
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default} >
        <ItemMovieCard info={mockMovie} />
      </ThemeProvider >
    );
    expect(getByTestId('container-item-movie-card')).toMatchSnapshot()
  })

  it('should render correctly with given movie info: badge', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <ItemMovieCard info={mockMovie} />
      </ThemeProvider>
    );

    const badgeText = getByText('85%');
    expect(badgeText).toBeTruthy();
  });

  it('should render correctly with given movie info: image', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.default}>
        <ItemMovieCard info={mockMovie} />
      </ThemeProvider>
    );

    const image = getByTestId('image-poster');
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe(`https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`);
  });

  it('should render correctly with given movie info: fontFamily', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.default}>
        <ItemMovieCard info={mockMovie} />
      </ThemeProvider>
    );

    const badgeText = getByText('85%');
    expect(badgeText.props.style).toHaveProperty('fontFamily', 'Nunito_700Bold');
  });
});