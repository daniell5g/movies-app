import MovieDetailCard from '@components/MovieDetailCard';
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useMovieDetails } from '@hooks/useMovieDetails';
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formatTime } from '@utils/format-time';
import { format } from 'date-fns';
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { useFavoritesStore } from 'src/store/favoritesStore';

import * as S from './styles'

type Props = {
  movieId: number;
}

export const DetailsPage = () => {
  const isConnected = useNetworkStatus();
  const navigation = useNavigation();
  const route = useRoute();

  const { movieId } = route.params as Props;
  const { movieDetails, loading } = useMovieDetails(movieId);
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const isFavorite = favorites.some((movie) => movie.id === movieId);


  const handleGoBack = () => {
    navigation.navigate('HomePage');
  }

  const handleToggleFavorite = () => {
    if (movieDetails) {
      if (isFavorite) {
        removeFavorite(movieId);
      } else {
        addFavorite(movieDetails);
      }
    }
  }

  useEffect(() => {
    if (!isConnected) {
      handleGoBack();
    }
  }, [isConnected]);

  return (
    <S.Container>
      <ScrollView>
        <S.Header>
          <S.ActionLeft onPress={handleGoBack}>
            <Feather name='arrow-left' size={24} color='#fff' />
          </S.ActionLeft>

          <S.ActionRight onPress={handleToggleFavorite}>
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-outline'}
              size={24}
              color={isFavorite ? 'red' : '#fff'}
            />
          </S.ActionRight>
        </S.Header>

        <S.Body>
          {loading && (
            <S.LoadingIndicatorContainer>
              <S.LoadingIndicator />
            </S.LoadingIndicatorContainer>
          )}

          {!loading && movieDetails && (
            <>
              <S.ImagePoster
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
                }}
              />

              <S.TextTitle>
                {movieDetails?.title}
              </S.TextTitle>

              <S.LabelSinopse>
                sinopse
              </S.LabelSinopse>

              <S.TextOverview>
                {movieDetails?.overview}
              </S.TextOverview>

              <S.Divider />

              <S.InfoBlock>
                <MovieDetailCard
                  iconName='calendar'
                  title='Lançamento'
                  subtitle={format(new Date(movieDetails?.release_date), 'dd/MM/yyyy')}
                />

                <MovieDetailCard
                  iconName='star'
                  title='Avaliações'
                  subtitle={new Intl.NumberFormat('pt-BR').format(movieDetails?.vote_count)}
                />
              </S.InfoBlock>

              <S.InfoBlock>
                <MovieDetailCard
                  iconName='dollar-sign'
                  title='Faturamento'
                  subtitle={
                    `${new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(movieDetails?.revenue)}`
                  }
                />

                <MovieDetailCard
                  iconName='clock'
                  title='Duração'
                  subtitle={formatTime(movieDetails?.runtime)}
                />
              </S.InfoBlock>
            </>
          )}
        </S.Body>
      </ScrollView>
    </S.Container>
  )
}