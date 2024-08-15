import type { Movie } from '@utils/interfaces'

export interface IDetailsPageViewModel {
  loading: boolean
  isFavorite: boolean
  movieDetails: Movie | null
  handleGoBack(): void
  handleToggleFavorite(): void
}