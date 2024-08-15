import { ItemMovieCard } from '@components/ItemMovieCard';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { useNavigation } from '@react-navigation/native';
import type { Movie } from '@utils/interfaces';
import React, { useEffect } from 'react';

import * as S from './styles';
import { useHomeViewModel } from './viewModel';

export const HomePage = () => {
  const isConnected = useNetworkStatus();
  const navigation = useNavigation();

  const {
    error,
    movies,
    loading,
    search,
    noResult,
    searchLoading,
    handleSearchMovies,
    loadMoreMovies,
    handleNavigatitonToDetailsPage,
  } = useHomeViewModel();

  useEffect(() => {
    loadMoreMovies();
  }, []);

  const componentMovieItem = ({ item }: { item: Movie }) => (
    <ItemMovieCard
      info={item}
      onPress={() => handleNavigatitonToDetailsPage(item.id)}
    />
  );

  return (
    <S.Container>
      {error && isConnected && (
        <S.AlertBanner>
          <S.AlertBannerText>{error}</S.AlertBannerText>
        </S.AlertBanner>
      )}

      {!isConnected && (!error || error) && (
        <S.AlertBanner>
          <Feather name='wifi' size={18} color='#fff' />
          <S.AlertBannerText>Sem conexão com a internet</S.AlertBannerText>
        </S.AlertBanner>
      )}

      <S.Header>
        <S.NameApp>BRQ Movies</S.NameApp>

        <S.ActionHeaderRight onPress={() => navigation.navigate('SettingsPage')}>
          <Feather name='settings' size={24} color='#fff' />
        </S.ActionHeaderRight>
      </S.Header>

      <S.SessionSearch>
        <S.Label>Qual o filme está buscando?</S.Label>
        <S.SearchInput
          testID='search-input'
          placeholder='Busque seu filme aqui...'
          value={search}
          onChangeText={handleSearchMovies}
        />
      </S.SessionSearch>

      {noResult && (
        <S.TextMovieNotFound>
          Nenhum filme encontrado com o termo: {search}
        </S.TextMovieNotFound>
      )}

      <S.SessionMovies>
        <S.SessionMoviesTitle>
          Filmes populares
        </S.SessionMoviesTitle>
        <S.ListMovies
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={componentMovieItem}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />

        {(loading || searchLoading) && (
          <S.LoadingMoviesContainer>
            <S.LoadingMoviesIndicator />
          </S.LoadingMoviesContainer>
        )}
      </S.SessionMovies>

      {!loading && !searchLoading && movies.length === 0 && (
        <S.ListEmptyComponent>
          <AntDesign name='inbox' size={38} color='#e5e5e5' />
          <S.EmptyText>
            Nada para exibir
          </S.EmptyText>
        </S.ListEmptyComponent>
      )}

      <S.FloatingActionFavorite
        onPress={() => navigation.navigate('FavoritePage')}
      >
        <Feather name='heart' size={24} color='#fff' />
      </S.FloatingActionFavorite>
    </S.Container>
  );
};
