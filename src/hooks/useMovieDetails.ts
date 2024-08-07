import type { Movie } from '@utils/interfaces';
import { useEffect, useState } from 'react';

import { api } from '../services/axios/api';

export const useMovieDetails = (movieId: number) => {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/movie/${movieId}`);
        setMovieDetails(response.data);
      } catch (error) {
        setError('Erro ao buscar detalhes do filme');
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return { movieDetails, loading, error };
};
