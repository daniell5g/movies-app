import { convertToPercentage } from '@utils/convert-decimal';
import type { Movie } from '@utils/interfaces';

import * as S from './styles'

type Props = {
  info: Movie
  onPress?: () => void;
}

export const ItemMovieCard = ({ info, ...rest }: Props) => {
  return (
    <S.Container {...rest} testID="container-item-movie-card">
      <S.ImagePoster
        testID="image-poster"
        source={{
          uri: `https://image.tmdb.org/t/p/w500${info.poster_path}`,
        }}
      />

      <S.Badge testID="badge">
        <S.BadgeText testID="badge-text">{convertToPercentage(info.vote_average)}%</S.BadgeText>
      </S.Badge>
    </S.Container>
  )
}