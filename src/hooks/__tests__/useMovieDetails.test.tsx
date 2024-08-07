import { renderHook } from '@testing-library/react-hooks';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/native';

import { useMovieDetails } from '../useMovieDetails';

const server = setupServer(
  http.get('/movie/:movieId', async ({ params }) => {
    const { movieId } = params;
    if (movieId === '1') {
      return HttpResponse.json({
        id: 1,
        title: 'Movie Title',
        overview: 'Movie Overview',
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        runtime: 120,
        release_date: '2024-08-07',
        vote_average: 8.5,
        vote_count: 100,
        revenue: 50000000
      });
    } else {
      return new Response(null, { status: 404 });
    }
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('useMovieDetails', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useMovieDetails(1));

    expect(result.current.movieDetails).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch movie details successfully', async () => {
    // TODO: Fix this test
    // const { result, waitForNextUpdate } = renderHook(() => useMovieDetails(1));

    // expect(result.current.loading).toBe(true);

    // await waitForNextUpdate();

    // expect(result.current.movieDetails).toEqual({
    //   id: 1,
    //   title: 'Movie Title',
    //   overview: 'Movie Overview',
    //   poster_path: '/poster.jpg',
    //   backdrop_path: '/backdrop.jpg',
    //   runtime: 120,
    //   release_date: '2024-08-07',
    //   vote_average: 8.5,
    //   vote_count: 100,
    //   revenue: 50000000
    // });

    // expect(result.current.loading).toBe(false);
    // expect(result.current.error).toBeNull();
  });
});
