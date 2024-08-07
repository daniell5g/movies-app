import { MaterialIcons } from '@expo/vector-icons'
import type { Movie } from '@utils/interfaces';

import { useFavoritesStore } from '../../store/favoritesStore';
import * as S from './styles'

type Props = {
  info: Movie
}

export const ItemMovieCardFavorite = ({ info, ...rest }: Props) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const isFavorite = favorites.some((movie) => movie.id === info.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(info.id);
    } else {
      addFavorite(info);
    }
  }

  return (
    <S.Container {...rest} testID="container-item-movie-card-favorite">
      <S.ImagePoster
        testID="image-poster"
        source={{
          uri: `https://image.tmdb.org/t/p/w500${info.poster_path}`,
        }}
      />

      <S.Badge onPress={handleToggleFavorite} testID="badge">
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-outline'}
          size={24}
          color={isFavorite ? 'red' : '#fff'}
        />
      </S.Badge>
    </S.Container>
  )
}