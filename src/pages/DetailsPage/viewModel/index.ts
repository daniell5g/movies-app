import { useMovieDetails } from '@hooks/useMovieDetails';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useFavoritesStore } from '../../../store/favoritesStore';
import type { IDetailsPageViewModel } from './interface';

type Props = {
  movieId: number;
}

const useDetailsPageViewModel = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { movieId } = route.params as Props;
  const { movieDetails, loading } = useMovieDetails(movieId);
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const isFavorite = favorites.some((movie) => movie.id === movieId);

  function handleGoBack() {
    navigation.navigate('HomePage');
  }

  function handleToggleFavorite() {
    if (movieDetails) {
      if (isFavorite) {
        removeFavorite(movieId);
      } else {
        addFavorite(movieDetails);
      }
    }
  }

  const viewModel: IDetailsPageViewModel = {
    isFavorite,
    loading,
    movieDetails,
    handleGoBack,
    handleToggleFavorite,
  };

  return viewModel
};

export { useDetailsPageViewModel };