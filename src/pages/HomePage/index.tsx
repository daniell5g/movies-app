import { ItemMovieCard } from '@components/ItemMovieCard';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { useNavigation } from '@react-navigation/native';
import type { Movie } from '@utils/interfaces';
import React, { useEffect, useRef, useState } from 'react';

import { api } from '../../services/axios/api';
import * as S from './styles';

export const HomePage = () => {
  const isConnected = useNetworkStatus();
  const navigation = useNavigation();

  const [listMovies, setListMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const movies = search.length > 2 ? searchResultMovies : listMovies;

  const loadMoreMovies = async () => {
    if (loading || (totalPages > 0 && page > totalPages)) return;

    setLoading(true);
    try {
      const response = await api.get("/movie/popular", {
        params: { page },
      });
      setListMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
      setTotalPages(response.data.total_pages);
      setError("");
    } catch (error: any) {
      setError("Não foi possível carregar os filmes");
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query: string) => {
    setSearchLoading(true);
    try {
      const response = await api.get("/search/movie", {
        params: {
          query,
        },
      });

      if (response.data.results.length === 0) {
        setNoResult(true);
        setSearchResultMovies([]);
      } else {
        setNoResult(false);
        setSearchResultMovies(response.data.results);
      }
      setError("");
    } catch (error: any) {
      setError("Erro ao buscar filmes");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchMovies = (text: string) => {
    setSearch(text);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (text.length > 2) {
      debounceRef.current = setTimeout(() => {
        searchMovies(text);
      }, 500);
    } else {
      setSearchResultMovies([]);
      setNoResult(false);
    }
  };

  const componentMovieItem = ({ item }: { item: Movie }) => (
    <ItemMovieCard
      info={item}
      onPress={() => navigation.navigate('DetailsPage', {
        movieId: item.id,
      })}
    />
  );

  useEffect(() => {
    loadMoreMovies();
  }, []);

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
