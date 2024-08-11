import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '@utils/interfaces';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { FAVORITES_KEY } from '../configs/constants';

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) => {
        const favorites = get().favorites;
        set({ favorites: [...favorites, movie] });
      },
      removeFavorite: (movieId) => {
        const favorites = get().favorites;
        set({ favorites: favorites.filter((movie) => movie.id !== movieId) });
      },
    }),
    {
      name: FAVORITES_KEY,
      getStorage: () => AsyncStorage,
    }
  )
);
