import { useNavigation } from '@react-navigation/native';
import type { Movie } from '@utils/interfaces';
import { useRef, useState } from 'react';

import { api } from '../../../services/axios/api';
import type { IHomeViewModel } from './interface';

const useHomeViewModel = () => {
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

  const handleNavigatitonToDetailsPage = (movieId: number) => {
    navigation.navigate('DetailsPage', {
      movieId,
    })
  };

  const viewModel: IHomeViewModel = {
    error,
    movies,
    loading,
    noResult,
    search,
    searchLoading,
    page,
    totalPages,
    handleSearchMovies,
    loadMoreMovies,
    handleNavigatitonToDetailsPage
  };

  return viewModel
};

export { useHomeViewModel };