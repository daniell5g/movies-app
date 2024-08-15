import type { Movie } from '@utils/interfaces';

export interface IHomeViewModel {
  error: string
  movies: Movie[]
  search: string
  loading: boolean
  noResult: boolean
  searchLoading: boolean
  page: number
  totalPages: number
  handleSearchMovies: (text: string) => void
  loadMoreMovies: () => Promise<void>
  handleNavigatitonToDetailsPage: (movieId: number) => void
}