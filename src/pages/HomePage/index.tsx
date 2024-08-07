import { ItemMovieCard } from '@components/ItemMovieCard';
import { AntDesign, Feather } from '@expo/vector-icons'
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { useNavigation } from '@react-navigation/native';
import type { Movie } from '@utils/interfaces';
import React, { useEffect, useState } from 'react'
import { api } from 'src/services/axios/api';

import * as S from './styles'

export const HomePage = () => {
  const isConnected = useNetworkStatus();
  const navigation = useNavigation();

  const [listMovies, setListMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

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
      // !! A api não retorna message quando há erro, apenas status
      setError("Não foi possível carregar os filmes");
    } finally {
      setLoading(false);
    }
  };

  const searcheMovies = async (query: string) => {
    setLoading(true);
    try {
      const response = await api.get("/search/movie", {
        params: {
          query,
        },
      });

      if (response.data.results.length === 0) {
        setNoResult(true);
        setLoading(false);
        setSearchResultMovies([])
      } else {
        setNoResult(false);
        setSearchResultMovies(response.data.results);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error?.response?.data.message);
    }
  };

  const handleSearchMovies = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      searcheMovies(text);
    } else {
      setSearchResultMovies([]);
    }
  };

  const componentMovieItem = ({ item }: { item: Movie }) =>
  (
    <ItemMovieCard info={item} onPress={() => navigation.navigate('DetailsPage', {
      movieId: item.id
    })} />
  )

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

        <S.ActionHeaderRight>
          <Feather name='settings' size={24} color='#fff' />
        </S.ActionHeaderRight>
      </S.Header>

      <S.SessionSearch>
        <S.Label>Qual o filme está buscando?</S.Label>
        <S.SearchInput placeholder='Busque seu filme aqui...' value={search} onChangeText={handleSearchMovies} />
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
          ListEmptyComponent={() => {
            if (!loading) {
              return (
                <S.ListEmptyComponent>
                  <AntDesign name='inbox' size={38} color='#e5e5e5' />
                  <S.EmptyText>
                    Nada para exibir
                  </S.EmptyText>
                </S.ListEmptyComponent>
              )
            }
          }}
        />

        {loading && (
          <S.LoadingMoviesContainer>
            <S.LoadingMoviesIndicator />
          </S.LoadingMoviesContainer>
        )}
      </S.SessionMovies>

      <S.FloatingActionFavorite
        onPress={() => navigation.navigate('FavoritePage')}
      >
        <Feather name='heart' size={24} color='#fff' />
      </S.FloatingActionFavorite>
    </S.Container>
  )
}